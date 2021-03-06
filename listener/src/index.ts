import Redis from 'ioredis';
import Parser from 'rss-parser';
import { WebhookClient, MessageEmbed, DiscordAPIError } from 'discord.js';
import { feeds, Feed } from './feeds';
import dotenv from 'dotenv';
import http from 'http';
import WebSocket from 'ws';
import { EventEmitter } from 'events';

dotenv.config({path:'../.env'});

const con = new Redis('redis://redis');

const sleep = (secs: number): Promise<undefined> => new Promise(r => setTimeout(() => r(undefined), secs * 1e3));

type PostData = {
  id: string,
  tags: string[],
  title: string,
  timestamp: number,
  link: string,
  creator: string,
}

const postEmitter = new EventEmitter();

const newPost = async (feed: Feed, post: Item, id: string) => {
  console.log(`New post ${id} in ${feed.id}. ${post.link}`)
  await con.sadd('posts', id);

  if(parseInt(post['slash:comments']) >= 5) return; // probably necropost

  postEmitter.emit('post', {
    id,
    tags: [feed.id, ...feed.tags.map(t => t.id)],
    title: post.title,
    timestamp: new Date(post.pubDate).getTime(),
    link: post.link,
    creator: post.creator,
  });

  const hooks = await con.sunion(`subs:${feed.id}`, ...feed.tags.map(tag => `subs:${tag.id}`));
  for(const hookid of hooks){
    const hook = await con.hgetall(`hook:${hookid}`)
    if(!('id' in hook && 'token' in hook)) {
      reportError(`Invalid hook? id:\`${hookid}\` data:\`${JSON.stringify(hook)}\``);
      continue;
    }
    const wh = new WebhookClient(hook.id, hook.token);
    try{
      await wh.send(
        new MessageEmbed()
          .setColor('ffaa00')
          .setTitle(feed.name)
          .setDescription(`[${post.title}](${post.link})`)
          .setFooter(`by: ${post.creator}`)
          .setTimestamp(new Date(post.pubDate)),
      )
    }catch(e){
      if(e instanceof DiscordAPIError && e.message === 'Unknown Webhook'){
        console.log(`Deleting invalid hook: ${hookid}`);
        await con.del(`hook:${hookid}`);
        const tags = await con.smembers(`hook:${hookid}:subs`);
        for(const tag of tags) await con.srem(`subs:${tag}`, hookid);
        await con.del(`hook:${hookid}:subs`);
        await con.srem(`guild:${hook.guild}:hooks`, hookid);
      }
    }
  }
}

type Item = {
  title: string,
  pubDate: string,
  link: string,
  creator: string,
  categories: [{_:string, $: { domain: string }}],
  'slash:comments': string,
};

const parser = new Parser<{}, Item>({
  customFields: {
    item: ['slash:comments']
  }
});

const categories = [
  ...feeds,
  ...new Set(feeds.map(f => f.tags).flat(1)),
];

const reportError = (()=>{

  const reported = new Set<string>();

  return (msg: string) => {
    console.error(msg)

    // to avert spamming the webhook
    if(reported.has(msg)) return;
    reported.add(msg);

    if(process.env.ERROR_WEBHOOK){
      const [id, token] = process.env.ERROR_WEBHOOK.split(',');
      new WebhookClient(id, token).send(
        new MessageEmbed()
          .setColor('ff0000')
          .setTitle('Error')
          .setDescription(msg)
          .setTimestamp()
      ).then(() => console.log('reported'), e => console.error(e));
    }
  }
})();

const checkFeed = async (url: string): Promise<string[]> => {
  try{
    const out = await Promise.race([
      parser.parseURL(url),
      sleep(5),
    ])

    if(!out) {
      console.log('TIMED OUT');
      return [];
    }

    const checks = await Promise.all(out.items.map(async item => {
      const category = item.categories[0].$.domain;
      const feed = feeds.find(f => f.url === category);
      if(!feed) {
        reportError(`UNKNOWN FEED: "${category}" ${item.link}`);
        return false;
      }
      const match = item.link.match(/(\d+)\/?$/);
      if(!match) {
        reportError(`URL CANNOT BE PARSED: ${item.link}`);
        return false;
      }
      const id = match[1];
      const isMember = await con.sismember('posts', id)
      if(!isMember) {
        await newPost(feed, item, id);
        return category;
      }
      return false;
    }));
    const anynew = [...new Set(checks.filter(v => v))] as string[];
    return anynew;
  }catch(e){
    console.log('ERRORED')
    console.error(e);
  }
  return [];
}

type FeedQueueItem = {
  url: string,
  lastTimes: number[],
  prev: number,
}


// used to reference these items because they might not be always present in the queue
const queueItems: FeedQueueItem[] = feeds.map(f => ({url: f.url, lastTimes: [], prev: 0}));

/*
I use this to keep a running average of time between posts on each rss feed
I adjust the interval between checks based 1/10th the average interval
The gap is capped at 15 minutes
*/
const feedQueue: FeedQueueItem[] = [
  ...queueItems,
  // this might help me discover when new forums are created by throwing errors lol
  {url: 'https://hypixel.net/forums/-/', lastTimes: [], prev: 0},
];

(async()=>{
  await con.del('categories');
  await con.sadd('categories', ...categories.map(c => c.id));

  for(const category of categories){
    await con.hset(
      `category:${category.id}`, 
      'name', category.name,
      'url', category.url,
    );
  }
  
  console.log('Beginning check loop!')
  while(true){
    const period = sleep(0.75);

    if(feedQueue.length){
      const feed = feedQueue.shift()!;
      const news = await checkFeed(`${feed.url}index.rss`);
      let avg: number;
      if(feed.prev === 0) feed.prev = Date.now();

      if(news.length) {
        const toUpdate = [feed];

        // purpose of this is so when this feed is hit it still effects the running avg
        // for the feeds it stole new posts from
        // hopefully this will make it less reliant on this feed
        if(feed.url === 'https://hypixel.net/forums/-/') {
          for(const newf of news){
            const foundFeed = queueItems.find(f => f.url === newf);
            if(foundFeed) toUpdate.push(foundFeed);
            else reportError(`Queue item not found for ${newf}`);
          }
        }

        // update all feeds effected
        // usually this is only the `feed`, but if its that route above it will be more
        for(const f of toUpdate){
          // push the current gap to the history
          f.lastTimes.push(Date.now() - f.prev);
          f.prev = Date.now();
          while(f.lastTimes.length > 50) f.lastTimes.shift(); //remove old times. if *should* work the same as the while here
        }
        avg = feed.lastTimes.reduce((a, c) => a + c, 0) / feed.lastTimes.length;
      }else{
        // Use the current gap in the average.
        avg = (Date.now() - feed.prev + feed.lastTimes.reduce((a, c) => a + c, 0)) / (feed.lastTimes.length + 1);
      }

      const timeout = Math.min(avg / 10, 900e3); // No more than 15 minutes between checks
      console.log(`Timeout: ${Math.round(timeout).toLocaleString()}ms for ${feed.url}`)
      setTimeout(() => feedQueue.push(feed), timeout);
    }; // else pass

    await period;
  }
})();

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hypixel Forums Bot WebSocket Server!')
});
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', () => ws.send(JSON.stringify({ type: 'ping' }))); // used to keep the connection alive

  const listnerFn = (data: PostData) => ws.send(JSON.stringify({ type:'post', data }));
  postEmitter.on('post', listnerFn);
  ws.on('close', () => postEmitter.removeListener('post', listnerFn));
});

server.listen(5000);

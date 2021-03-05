import Redis from 'ioredis';
import Parser from 'rss-parser';
import { WebhookClient, MessageEmbed } from 'discord.js';
import { feeds, Feed } from './feeds';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

const con = new Redis('redis://redis');

const sleep = (secs: number): Promise<undefined> => new Promise(r => setTimeout(() => r(undefined), secs * 1e3));

const newPost = async (feed: Feed, post: Item, id: string) => {
  console.log(`New post ${id} in ${feed.id}. ${post.link}`)
  await con.sadd('posts', id);
  if(parseInt(post['slash:comments']) > 3) return; // probably necropost
  const hooks = await con.sunion('subs:all',`subs:${feed.id}`, ...feed.tags.map(tag => `subs:${tag.id}`))
  for(const hookid of hooks){
    const hook = await con.hgetall(`hook:${hookid}`)
    if(!('id' in hook && 'token' in hook)) continue;
    const wh = new WebhookClient(hook.id, hook.token);
    await wh.send(
      new MessageEmbed()
        .setColor('ffaa00')
        .setTitle(feed.name)
        .setDescription(`[${post.title}](${post.link})`)
        .setFooter(`by: ${post.creator}`)
        .setTimestamp(new Date(post.pubDate))
    )
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

const reportError = (msg: string) => {
  console.error(msg)
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
    const period = sleep(1);
    tryblock:
    try{
      const out = await Promise.race([
        parser.parseURL(`https://hypixel.net/forums/-/index.rss`),
        sleep(5),
      ])
      if(!out) break tryblock;
      for(const item of out.items){
        const category = item.categories[0].$.domain;
        const feed = feeds.find(f => f.url === category);
        if(!feed) {
          reportError(`UNKNOWN FEED: "${category}" ${item.link}`);
          continue;
        }
        const match = item.link.match(/(\d+)\/?$/);
        if(!match) {
          reportError(`URL CANNOT BE PARSED: ${item.link}`);
          continue
        }
        const id = match[1];
        const isMember = await con.sismember('posts', id)
        if(!isMember) await newPost(feed, item, id);
      }
    }catch(e){ }
    await period;
  }
})();

import Redis from 'ioredis';
import Parser from 'rss-parser';
import { WebhookClient, MessageEmbed } from 'discord.js';
import { feeds, Feed } from './feeds';

const con = new Redis('redis://redis');

const sleep = (secs: number) => new Promise(r => setTimeout(r, secs * 1e3));

const newPost = async (feed: Feed, post: Item, id: string) => {
  console.log(`New post ${id} in ${feed.id}. ${post.link}`)
  await con.sadd('posts', id);
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
};

const parser = new Parser<{}, Item>();

const categories = [
  ...feeds,
  ...new Set(feeds.map(f => f.tags).flat(1)),
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
    console.log('Checking all feeds!')
    for(const feed of feeds){
      const out = await parser.parseURL(`${feed.url}index.rss`);
      for(const item of out.items){
        const id =  item.link.substring(item.link.lastIndexOf('.') + 1, item.link.length - 1);
        const isMember = await con.sismember('posts', id)
        if(!isMember) await newPost(feed, item, id);
      }
      await sleep(0.5);
    }
  }
})();

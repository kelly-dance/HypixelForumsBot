import { Command } from '../types';
import { isAdmin, or, isDM } from '../utils';
import con from '../con';
import Discord, { MessageEmbed } from 'discord.js';

const getListeners = async (s: string, tags: string[]): Promise<number> => {
  const isTag = tags.includes(s);
  const [cur, parent] = await Promise.all([
    con.scard(`subs:${s}`),
    con.hget(isTag ? `tag:${s}` : `feed:${s}`, 'parent')
  ]);
  let tot = cur;
  if(parent) tot += await getListeners(parent, tags);
  return tot;
}

export default {
  name: 'tags',
  aliases: ['tag', 'feeds', 'feed'],
  basic: `List available tags and feeds, or see info about one. \n\`${process.env.PREFIX}tags [tag]\``,
  advanced: `Use \`${process.env.PREFIX}tags\` to view all tags and feeds or use \`${process.env.PREFIX}tags <tag>\` to inspect a specifc tag or feed.`,
  dms: true,
  hasPermission: or(isAdmin, isDM),
  async exec(msg, args){
    const tags = await con.smembers('tags');
    const feeds = await con.smembers('feeds');
    if(!args.length){
      msg.channel.send(
        new MessageEmbed()
          .setColor('ffaa00')
          .setTitle('Hypixel Alert Bot Tags')
          .setDescription([
            `Check out a specific tag with \`${process.env.PREFIX}tag [tag]\``,
            '',
            '**Tags**',
            tags.sort().map(t => `\`${t}\``).join(', '),
            '',
            '**Feeds**',
            feeds.sort().map(t => `\`${t}\``).join(', '),
          ].join('\n'))
      )
    }else{
      const specific = args[0];
      if(!tags.includes(specific) && !feeds.includes(specific)) return msg.reply('That tag or feed does not exist!');

      if(tags.includes(specific)){
        const tag = await con.hgetall(`tag:${specific}`);
        if(Object.keys(tag).length === 0) return msg.reply('Sorry, something went wrong! Double check what you typed?');

        const [listeners, subtags, subfeeds] = await Promise.all([
          getListeners(specific, tags),
          con.smembers(`tag:${specific}:tags`),
          con.smembers(`tag:${specific}:feeds`),
        ]);

        const description = [
          `URL: ${tag.url}`,
          `Tag: \`${specific}\``,
          `Parent Tag: ${tag.parent ? `\`${tag.parent}\`` : 'None'}`,
          `Hooks listening: ${listeners.toLocaleString()}`,
        ];

        if(subtags.length){
          description.push(
            '**Subtags**',
            subtags.sort().map(t => `\`${t}\``).join(', '),
          )
        }

        if(subfeeds.length){
          description.push(
            '**Feeds**',
            subfeeds.sort().map(t => `\`${t}\``).join(', '),
          )
        }

        msg.channel.send(
          new Discord.MessageEmbed()
            .setColor('ffaa00')
            .setTitle(tag.name)
            .setDescription(description.join('\n'))
        )
      }else{
        const feed = await con.hgetall(`feed:${specific}`);
        if(Object.keys(feed).length === 0) return msg.reply('Sorry, something went wrong! Double check what you typed?');

        const listeners = await getListeners(specific, tags);

        msg.channel.send(
          new Discord.MessageEmbed()
            .setColor('ffaa00')
            .setTitle(feed.name)
            .setDescription([
              `URL: ${feed.url}`,
              `Feed: \`${specific}\``,
              `Parent Tag: \`${feed.parent}\``,
              `Hooks listening: ${listeners.toLocaleString()}`
            ].join('\n'))
        )
      }
    }
  }
} as Command;
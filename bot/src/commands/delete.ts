import { Command } from '../types';
import { isAdmin, findHook, hasHookPerms, isTagOrFeed } from '../utils';
import con from '../con';
import Discord from 'discord.js';

export default {
  name: 'delete',
  aliases: ['remove', 'del', 'rem'],
  basic: `Delete a hook or remove tags or feeds from a hook. \n\`${process.env.PREFIX}delete <#channel> [tag 1] [tag 2] ...\``,
  advanced: `Use  \`${process.env.PREFIX}delete <#channel>\` to remove all alerts from a channel, or use \`${process.env.PREFIX}delete <#channel> <tag 1> [tag 2] ...\` to remove specific tags or feeds from a channel.`,
  hasPermission: isAdmin,
  async exec(msg, args){
    const mentionedChannel = msg.mentions.channels.first();
    if(!mentionedChannel) return msg.reply(`You must specify specific a channel. Ex \`${process.env.PREFIX}delete <#channel> [tags] ...\``);
    
    const tags = args.slice(1)
      .map(s => s.toLowerCase());
    for(const tag of tags){
      const ismember = await isTagOrFeed(tag);
      if(!ismember) return msg.reply(`The tag "${tag}" is invalid. Use \`${process.env.PREFIX}tags\` to see all valid tags and feeds.`)
    }

    const deleteAll = tags.length === 0;

    if(!hasHookPerms(mentionedChannel))
      return msg.reply('The bot needs the Manage Webhooks permission in order to work!');

    let hook: Discord.Webhook | undefined = await findHook(mentionedChannel);

    if(!hook) return msg.reply('There is not even a hook in that channel!');

    const allTags = await con.smembers(`hook:${hook.id}:subs`);

    const what = tags.filter(t => !allTags.includes(t));
    if(what.length) return msg.reply(`You provided tag(s) or feed(s) that are not even active on that channel: ${what.map(t => `\`${t}\``).join(', ')}`)
    
    if(deleteAll || allTags.every(t => tags.includes(t))){
      await hook.delete();
      await Promise.all([
        con.del(`hook:${hook.id}:subs`),
        con.del(`hook:${hook.id}`),
        con.srem(`guild:${msg.guild!.id}:hooks`, hook.id),
        ...allTags.map(tag => con.srem(`subs:${tag}`, hook!.id)),
      ]);
      msg.reply('Deleted hook!');
    }else{
      await Promise.all([
        con.srem(`hook:${hook.id}:subs`, ...tags),
        ...tags.map(tag => con.srem(`subs:${tag}`, hook!.id)),
      ]);
      msg.reply(`Deleted ${tags.length} tags or feeds!`);
    }
  }
} as Command;

import { Command } from '../types';
import { isAdmin, findHook } from '../utils';
import con from '../con';
import Discord from 'discord.js';

export default {
  name: 'delete',
  aliases: ['remove'],
  help: '',
  hasPermission: isAdmin,
  async exec(msg, args){
    const mentionedChannel = msg.mentions.channels.first();
    if(!mentionedChannel) return msg.reply('You must specific a channel. Ex `hf.create #channel tags`');
    
    const tags = args.slice(1)
      .map(s => s.toLowerCase());
    for(const tag of tags){
      const ismember = await con.sismember('categories', tag);
      if(!ismember) return msg.reply(`The tag "${tag}" is invalid. Use \`${process.env.PREFIX}tags\` to see all valid tags.`)
    }

    const deleteAll = tags.length === 0;

    let hook: Discord.Webhook | undefined = await findHook(msg.channel as Discord.TextChannel);

    if(!hook) return msg.reply('There is not even a hook in that channel!');

    const allTags = await con.smembers(`hook:${hook.id}:hook`);
    if(deleteAll || allTags.length === tags.length){
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
      msg.reply('Deleted those tags!');
    }
    
  }
} as Command;

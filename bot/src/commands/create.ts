import { Command } from '../types';
import { isAdmin, findHook } from '../utils';
import con from '../con';
import Discord from 'discord.js';

export default {
  name: 'create',
  aliases: ['add'],
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
    if(tags.length < 1) return msg.reply('You must profive atleast 1 tag. Ex `hf.create #channel all`');
    
    let hook: Discord.Webhook | undefined = await findHook(msg.channel as Discord.TextChannel);

    if(!hook){
      hook = await (msg.channel as Discord.TextChannel).createWebhook('Hypixel Forums Alerts');
      await Promise.all([
        con.hset(
          `hook:${hook.id}`,
          'id', hook.id,
          'token', hook.token!,
        ),
        con.sadd(`guild:${msg.guild!.id}:hooks`, hook.id),
      ]);
    }
    await Promise.all([
      con.sadd(`hook:${hook.id}:subs`, ...tags),
      ...tags.map(tag => con.sadd(`subs:${tag}`, hook!.id)),
    ]);
    msg.reply(`Added ${tags.length} tags to ${mentionedChannel}.`);
  }
} as Command;
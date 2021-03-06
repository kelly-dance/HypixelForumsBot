import { Command } from '../types';
import { isAdmin, findHook, hasHookPerms } from '../utils';
import con from '../con';
import Discord from 'discord.js';

export default {
  name: 'create',
  aliases: ['add', 'new'],
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

    if(!hasHookPerms(mentionedChannel))
      return msg.reply('The bot needs the Manage Webhooks permission in order to work!');

    let hook: Discord.Webhook | undefined = await findHook(mentionedChannel);

    if(!hook){
      hook = await mentionedChannel.createWebhook('Hypixel Forums Alerts', {
        avatar: 'https://img.mcpqndq.dev/zeDW',
      });
      await Promise.all([
        con.hset(
          `hook:${hook.id}`,
          'id', hook.id,
          'token', hook.token!,
          'guild', msg.guild!.id,
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
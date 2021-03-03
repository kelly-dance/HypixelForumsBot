import { Command } from '../types';
import { isAdmin, findHook } from '../utils';
import con from '../con';
import Discord from 'discord.js';

export default {
  name: 'inspect',
  aliases: ['list'],
  help: '',
  hasPermission: isAdmin,
  async exec(msg, args){
    const mentionedChannel = msg.mentions.channels.first();
    if(mentionedChannel){
      let hook: Discord.Webhook | undefined = await findHook(msg.channel as Discord.TextChannel);

      if(!hook) return msg.reply('There is no hook in that channel!');

      const tags = await con.smembers(`hook:${hook.id}:subs`);

      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor('ffaa00')
          .setTitle(`#${mentionedChannel.name} Tags`)
          .setDescription(tags.join(', '))
      )
    }else{

      const guildHooks = await msg.guild!.fetchWebhooks();
      const hookIds = await con.smembers(`guild:${msg.guild!.id}:hooks`);
      const hooks = await Promise.all(hookIds.map(async id => {
        const tags = await con.smembers(`hook:${id}:subs`);
        const hook = guildHooks.get(id);
        if(!hook) console.error('There should always be a hook here?');
        return {
          id,
          tags,
          hook,
        }
      }))

      const content = hooks
        .map(hook => `<#${hook.hook?.channelID}>\n${hook.tags.join(', ')}`)
        .join('\n\n');

      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor('ffaa00')
          .setTitle(`${msg.guild!.name} Hooks`)
          .setDescription(content || 'This guild has no hooks!')
      )
    }
  }
} as Command;
import { Command } from '../types';
import { isAdmin, findHook, hasHookPerms } from '../utils';
import con from '../con';
import Discord from 'discord.js';

export default {
  name: 'inspect',
  aliases: ['list', 'view'],
  help: '',
  hasPermission: isAdmin,
  async exec(msg, args){
    const mentionedChannel = msg.mentions.channels.first();

    if(mentionedChannel){
      if(!hasHookPerms(mentionedChannel))
        return msg.reply('The bot needs the Manage Webhooks permission in order to work!');

      let hook: Discord.Webhook | undefined = await findHook(mentionedChannel);

      if(!hook) return msg.reply('There is no hook in that channel!');

      const tags = await con.smembers(`hook:${hook.id}:subs`);

      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor('ffaa00')
          .setTitle(`#${mentionedChannel.name} Tags`)
          .setDescription(tags.join(', '))
      )
    }else{
      try{
        const guildHooks = await msg.guild!.fetchWebhooks();
        const hookIds = await con.smembers(`guild:${msg.guild!.id}:hooks`);
        const hooks = await Promise.all(hookIds.map(async id => {
          const tags = await con.smembers(`hook:${id}:subs`);
          const hook = guildHooks.get(id);
          if(!hook) console.error('There should always be a hook here?');
          return { id, tags, hook };
        }));

        const content = hooks
          .map(hook => `<#${hook.hook?.channelID}>\n${hook.tags.join(', ')}`)
          .join('\n\n');

        return msg.channel.send(
          new Discord.MessageEmbed()
            .setColor('ffaa00')
            .setTitle(`${msg.guild!.name} Hooks`)
            .setDescription(content || 'This guild has no hooks!')
        )
      }catch(e){
        msg.reply('Something went wrong. It\'s likely a permission issue. Make sure the bot has Manage Webhooks.')
      }
    }
  }
} as Command;
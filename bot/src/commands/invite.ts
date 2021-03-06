import { MessageEmbed } from 'discord.js';
import { Command } from '../types';
import { anyone, isAdmin } from '../utils';

const embed = new MessageEmbed()
  .setColor('ffaa00')
  .setTitle(`Hypixel Forums Alerts Bot Invites`)
  .setDescription([
    '**Bot Invite Link**',
    'https://discord.com/api/oauth2/authorize?client_id=796133985298153502&permissions=536881152&scope=bot',
    '',
    '**Hub Server**',
    'https://discord.gg/SMVy3ZfGAe',
  ].join('\n'));

export default {
  name: 'invite',
  aliases: ['invites','hub','support'],
  basic: `Get the bot\'s invite link & invite link to the hub server. \n\`${process.env.PREFIX}invite\``,
  advanced: `Get the bot\'s invite link & invite link to the hub server. If the bot has manage messages permissions when non-admins use this command it will silently send to DMs. \`${process.env.PREFIX}invite\``,
  hasPermission: anyone,
  dms: true,
  async exec(msg){
    if(msg.channel.type === 'dm'){
      msg.channel.send(embed);
    }else{
      const replyInDms = !isAdmin(msg);
      const channel = replyInDms ? msg.author : msg.channel;
      try{
        await channel.send(embed);
        try{
          if(replyInDms) await msg.delete();
        }catch(e){
          msg.reply('Sent to your DMs!');
        }
      }catch(e){
        if(replyInDms) msg.reply('You have messages from members of this server disabled! I can\'t send you the invite!');
      }
    }
  }
} as Command;
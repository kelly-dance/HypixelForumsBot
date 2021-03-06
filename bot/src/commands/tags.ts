import { Command } from '../types';
import { isAdmin, or, isDM } from '../utils';
import con from '../con';
import Discord, { MessageEmbed } from 'discord.js';

export default {
  name: 'tags',
  aliases: ['tag'],
  basic: `List avaialable tags, or see info about one. \n\`${process.env.PREFIX}tags [tag]\``,
  advanced: `Use \`${process.env.PREFIX}tags\` to view all tags or use \`${process.env.PREFIX}tag <tag>\` to inspect a specifc tag!`,
  dms: true,
  hasPermission: or(isAdmin, isDM),
  async exec(msg, args){
    const tags = await con.smembers('categories');
    if(!args.length){
      msg.channel.send(
        new MessageEmbed()
          .setColor('ffaa00')
          .setTitle('Hypixel Alert Bot Tags')
          .setDescription(`Check out a specific tag with \`${process.env.PREFIX}tag [tag]\`\n\n` + tags.map(t => `\`${t}\``).join(', '))
      )
    }else{
      const specific = args[0];
      if(!tags.includes(specific)) return msg.reply('That tag does not exist!');

      const category = await con.hgetall(`category:${specific}`);
      if(Object.keys(category).length === 0) return msg.reply('Sorry, something went wrong! Double check what you typed?');

      const listeners = await con.scard(`subs:${specific}`);

      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor('ffaa00')
          .setTitle(category.name)
          .setDescription([
            `URL: ${category.url}`,
            `Tag: \`${specific}\``,
            `Hooks listening: ${listeners.toLocaleString()}`
          ].join('\n'))
      )
    }
  }
} as Command;
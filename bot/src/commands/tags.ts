import { Command } from '../types';
import { isAdmin, findHook } from '../utils';
import con from '../con';
import Discord from 'discord.js';

export default {
  name: 'tags',
  aliases: [],
  help: '',
  hasPermission: isAdmin,
  async exec(msg, args){
    const tags = await con.smembers('categories');
    if(!args.length){
      return msg.reply(`Valid tags are: ${tags.join(', ')}`);
    }else{
      const specific = args[0];
      if(!tags.includes(specific)) return msg.reply('That tag does not exist!');
      const category = await con.hgetall(`category:${specific}`);
      if(Object.keys(category).length === 0) return msg.reply('Sorry, something went wrong! Double check what you typed?');
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor('ffaa00')
          .setTitle(category.name)
          .setDescription([
            `URL: ${category.url}`,
            `id: ${specific}`
          ].join('\n'))
      )
    }
  }
} as Command;
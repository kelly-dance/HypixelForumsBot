import { MessageEmbed } from 'discord.js';
import { Command } from '../types';
import { isAdmin, isDM, or } from '../utils';

export default {
  name: 'help',
  aliases: [],
  basic: `View commands or get info about a specific command. \n\`${process.env.PREFIX}help [command]\``,
  advanced: `use \`${process.env.PREFIX}help\` to view all commands or use \`${process.env.PREFIX}help <command>\` to view information about one!`,
  dms: true,
  hasPermission: or(isAdmin, isDM),
  async exec(msg, args){
    const commands = (await import('./index')).default;
    let targetCommand: Command | undefined;
    if(args.length){
      const cmdName = args[0].toLowerCase();
      targetCommand = commands.find(c => c.name === cmdName || c.aliases.includes(cmdName));
    }
    if(!targetCommand){
      msg.channel.send(
        new MessageEmbed()
          .setColor('ffaa00')
          .setTitle(args.length ? 'Unknown Command' : 'Hypixel Alert Bot Commands')
          .addFields(commands.filter(c => !c.hidden).map(c => ({name: c.name, value: c.basic}))),
      )
    }else{
      msg.channel.send(
        new MessageEmbed()
          .setColor('ffaa00')
          .setTitle(targetCommand.name)
          .setDescription([
            '**Info**',
            targetCommand.advanced,
            '',
            '**aliases**',
            targetCommand.aliases.length ? targetCommand.aliases.map(a => `\`${a}\``).join(', ') : 'None',
          ].join('\n')),
      )
    }
  }
} as Command;
import Discord from 'discord.js';

export type Command = {
  name: string,
  aliases: string[],
  help: string,
  hasPermission: (msg: Discord.Message) => boolean,
  exec: (msg: Discord.Message, args: string[]) => unknown,
}

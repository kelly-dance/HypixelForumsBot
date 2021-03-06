import Discord from 'discord.js';

export type Command = {
  name: string,
  aliases: string[],
  basic: string,
  advanced: string,
  hasPermission: Permission,
  exec: (msg: Discord.Message, args: string[]) => unknown,
  hidden?: boolean,
  dms?: boolean,
}

export type Permission = (msg: Discord.Message) => Promise<boolean>;

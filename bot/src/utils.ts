import Discord, { Webhook } from 'discord.js';
import con from './con';

export const isAdmin = (msg: Discord.Message) => !!msg.member?.permissions.has('ADMINISTRATOR');

export const hasHookPerms = (channel: Discord.TextChannel) => channel.permissionsFor(channel.client.user!)?.has('MANAGE_WEBHOOKS');

export const findHook = async (channel: Discord.TextChannel): Promise<Webhook | undefined> => {
  const hooks = await channel?.fetchWebhooks()!;
  for(const hook of hooks.values()){
    const ismember = await con.sismember(`guild:${channel.guild.id}:hooks`, hook.id);
    if(ismember) return hook;
  }
  return;
}

import Discord from 'discord.js';
import { Permission } from './types';
import con from './dbCon';

export const id = <T>(v: T): T => v;

export const or = (...perms: Permission[]): Permission => async msg => {
  const results = await Promise.all(perms.map(p => p(msg)));
  return results.some(id);
};

export const and = (...perms: Permission[]): Permission => async msg => {
  const results = await Promise.all(perms.map(p => p(msg)));
  return results.every(id);
};

export const anyone: Permission = async () => true;

export const isDM: Permission = async msg => msg.channel.type === 'dm';

export const isGuildChannel: Permission = async msg => msg.channel.type === 'text';

export const isAdmin: Permission = async msg => !!msg.member?.permissions.has('ADMINISTRATOR');

export const isBotAdmin: Permission = async msg => (process.env.ADMINS||'').split(',').includes(msg.author.id);

export const hasHookPerms = (channel: Discord.TextChannel) => !!channel.permissionsFor(channel.client.user!)?.has('MANAGE_WEBHOOKS');

export const findHook = async (channel: Discord.TextChannel): Promise<Discord.Webhook | undefined> => {
  const hooks = await channel?.fetchWebhooks()!;
  for(const hook of hooks.values()){
    const ismember = await con.sismember(`guild:${channel.guild.id}:hooks`, hook.id);
    if(ismember) return hook;
  }
  return;
}

export const getTags = () => con.smembers('tags');
export const getFeeds = () => con.smembers('feeds');
export const getTagsOrFeeds = async () => {
  const [tags, feeds] = await Promise.all([getTags(), getFeeds()]);
  return [...tags, ...feeds];
}
export const isTagOrFeed = async (s: string): Promise<boolean> => {
  const isMembers = await Promise.all([
    con.sismember('tags', s),
    con.sismember('feeds', s),
  ]);
  return isMembers.some(id);
}

export const reportError = (()=>{

  const reported = new Set<string>();

  return (msg: string) => {
    console.error(msg)

    // to avert spamming the webhook
    // bc of shards could still be issue
    if(reported.has(msg)) return;
    reported.add(msg);

    if(process.env.ERROR_WEBHOOK){
      const [id, token] = process.env.ERROR_WEBHOOK.split(',');
      new Discord.WebhookClient(id, token).send(
        new Discord.MessageEmbed()
          .setColor('ff0000')
          .setTitle('Error')
          .setDescription(msg)
          .setTimestamp()
      ).then(() => console.log('reported'), e => console.error(e));
    }
  }
})();

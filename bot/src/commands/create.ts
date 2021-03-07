import { Command } from '../types';
import { isAdmin, findHook, hasHookPerms, id, isTagOrFeed, getTags } from '../utils';
import con from '../dbCon';
import Discord from 'discord.js';

const findSubTags = async (t: string, store: Set<string>) => {
  if(store.has(t)) return;
  store.add(t);
  const isTag = await con.sismember('tags', t);
  if(!isTag) return;
  const [subtags, subfeeds] = await Promise.all([
    con.smembers(`tag:${t}:tags`),
    con.smembers(`tag:${t}:feeds`),
  ]);
  await Promise.all([
    ...subtags.map(st => findSubTags(st, store)),
    ...subfeeds.map(st => findSubTags(st, store)),
  ]);
}

export default {
  name: 'create',
  aliases: ['add', 'new', 'subscribe', 'sub'],
  basic: `Add forums alerts to a channel. \n\`${process.env.PREFIX}create <#channel> <tag or feed 1> [tag or feed 2] ...\``,
  advanced: `Use \`${process.env.PREFIX}create <#channel> <tag 1> [tag 2] ...\` to set tags or feeds to alert for in a channel.`,
  hasPermission: isAdmin,
  async exec(msg, args){
    const mentionedChannel = msg.mentions.channels.first();
    if(!mentionedChannel) return msg.reply(`You must specify specific a channel. Ex \`${process.env.PREFIX}create <#channel> <tag or feed> ...\``);

    let tags = args.slice(1).map(s => s.toLowerCase());
    for(const tag of tags){
      const ismember = await isTagOrFeed(tag);
      if(!ismember) return msg.reply(`The tag or feed "${tag}" is invalid. Use \`${process.env.PREFIX}tags\` to see all valid tags and feeds.`)
    }
    if(tags.length < 1) return msg.reply(`You must provide atleast 1 tag or feed. Ex \`${process.env.PREFIX}create <#channel> all\``);

    if(!hasHookPerms(mentionedChannel))
      return msg.reply('The bot needs the Manage Webhooks permission in order to work!');

    let hook: Discord.Webhook | undefined = await findHook(mentionedChannel);

    if(!hook){
      hook = await mentionedChannel.createWebhook('Hypixel Forums Alerts', {
        avatar: 'https://img.mcpqndq.dev/zeDW',
      });
      await Promise.all([
        con.hset(
          `hook:${hook.id}`,
          'id', hook.id,
          'token', hook.token!,
          'guild', msg.guild!.id,
        ),
        con.sadd(`guild:${msg.guild!.id}:hooks`, hook.id),
      ]);
    }else{
      const existingTags = await con.smembers(`hook:${hook.id}:subs`);
      // already included
      const alreadyIncluded = new Set<string>();
      for(const tag of existingTags){
        await findSubTags(tag, alreadyIncluded); //impure
      }
      const unnessecary = tags.filter(t => alreadyIncluded.has(t));
      tags = tags.filter(t => !alreadyIncluded.has(t));
      if(unnessecary.length){
        if(tags.length === 0){
          return msg.reply('All of the tags you are trying to add are already active in that channel.');
        }else{
          await msg.reply(`Warning! ${unnessecary.length} of the tags or feeds you are trying to add are already active in that channel. Skipping them.`)
        }
      }
      // nolonger needed
      const willInclude = new Set<string>();
      for(const tag of tags){
        await findSubTags(tag, willInclude); //impure
      }
      const nowUnnessecary = existingTags.filter(t => willInclude.has(t));
      if(nowUnnessecary.length){
        await msg.reply(`Warning, your new tags make some existing tags no longer nessecary: ${nowUnnessecary.map(t => `\`${t}\``).join(', ')}. They will be automatically removed.`);
        await Promise.all(
          nowUnnessecary.map(tag => [
            con.srem(`hook:${hook!.id}:subs`, tag),
            con.srem(`subs:${tag}`, hook!.id)
          ]).flat(1)
        );
      }
    }

    await Promise.all([
      con.sadd(`hook:${hook.id}:subs`, ...tags),
      ...tags.map(tag => con.sadd(`subs:${tag}`, hook!.id)),
    ]);
    msg.reply(`Added ${tags.length} tags to ${mentionedChannel}.`);
  },
} as Command;

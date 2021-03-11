import * as dotenv from 'dotenv';
import { Client, DiscordAPIError } from 'discord.js';
import { reportError } from './utils';
import commands from './commands';
import con from './dbCon';

dotenv.config({path:'../.env'});

if(!process.env.DISCORD_TOKEN) throw new Error('Missing PREFIX');

const client = new Client();

client.on('message', async msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === 'text' && !msg.content.startsWith(process.env.PREFIX)) return;

  const content = (msg.content.startsWith(process.env.PREFIX) ? msg.content.substring(process.env.PREFIX.length) : msg.content).trim().toLowerCase()
  const args = content.split(/\s+/g);
  const command = args.shift()

  if(!command) return;

  const target = commands.find(c => c.name === command || c.aliases.includes(command));

  if(!target) return;

  if(msg.channel.type === 'dm' && !target.dms) return msg.reply('This command is disabled in DMs!');

  const hasPerm = await target.hasPermission(msg);

  if(!hasPerm) {
    console.log(`Permmision denied: ${msg.author.username}#${msg.author.discriminator} -> ${msg.content}`)
    return msg.reply('You do not have permission to use this command!');
  }

  console.log(`Command: ${msg.author.username}#${msg.author.discriminator} -> ${msg.content}`);
  try{
    await target.exec(msg, args);
  }catch(e){
    reportError(`Guild: ${msg.guild?.name} (${msg.guild?.id})\nUser: ${msg.author.username}#${msg.author.discriminator} (${msg.author.id})\`\`\`json\n${JSON.stringify(e, null, 4)}\`\`\``)
    if(e instanceof DiscordAPIError && e.message === 'Missing Permissions') {
      try{
        msg.author.send('There was some form of Permission Error while executing your command. Double check and try again.');
      }catch(e){}
    }
  }
});

client.on('guildDelete', async guild => {
  const hooks = await con.smembers(`guild:${guild.id}:hooks`);
  const hooksPerTag = new Map<string, string[]>();
  for(const hook of hooks){
    // Clean up database
    await con.del(`hook:${hook}`);
    const tags = await con.smembers(`hook:${hook}:subs`);
    for(const tag of tags){
      if(!hooksPerTag.has(tag)) hooksPerTag.set(tag, []);
      hooksPerTag.get(tag)?.push(hook);
    }
    await con.del(`hook:${hook}:subs`);
  }
  for(const [tag, hooks] of hooksPerTag.entries()){
    await con.srem(`subs:${tag}`, ...hooks);
  }
  await con.del(`guild:${guild.id}:hooks`);
});

client.on('ready', () => {
  client.user?.setActivity({
    name: 'The Hypixel Forums',
    type: 'WATCHING',
  })
});

client.login(process.env.DISCORD_TOKEN);

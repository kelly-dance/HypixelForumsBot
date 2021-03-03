import * as dotenv from 'dotenv';
import { Client } from 'discord.js';
import commands from './commands';

dotenv.config({path:'../.env'});

if(!process.env.DISCORD_TOKEN) throw new Error('Missing PREFIX');

const client = new Client();

client.on('message', msg => {
	if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot || msg.channel.type !== 'text') return;

	const args = msg.content.slice(process.env.PREFIX.length).trim().toLowerCase().split(/\s+/g);
	const command = args.shift()

	if(!command) return;

	const target = commands.find(c => c.name === command || c.aliases.includes(command));

	if(!target) return;

	if(!target.hasPermission(msg)) {
		console.log(`Permmision denied: ${msg.author.username}#${msg.author.discriminator} -> ${msg.content}`)
		return msg.reply('You do not have permission to use this command!');
	}

	console.log(`Command: ${msg.author.username}#${msg.author.discriminator} -> ${msg.content}`)
	target.exec(msg, args);
});

client.login(process.env.DISCORD_TOKEN);
import * as dotenv from 'dotenv';
import { ShardingManager } from 'discord.js';

dotenv.config({path:'../.env'});

console.log('bot is alive')

const manager = new ShardingManager('./bot.js', { token: process.env.DISCORD_TOKEN });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();

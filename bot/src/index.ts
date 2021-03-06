import * as dotenv from 'dotenv';
import { ShardingManager } from 'discord.js';

dotenv.config({path:'../.env'});

const manager = new ShardingManager('./bot.js', { token: process.env.DISCORD_TOKEN });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

// idk why it sometimes just crashes when booting, but this should make it retry
const spawn = async () => {
  try{
    await manager.spawn();
  }catch(e){
    spawn();
  }
}
spawn();

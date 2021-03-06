import { Command } from '../types';
import { isBotAdmin } from '../utils';

export default {
  name: 'eval',
  aliases: [],
  basic: 'This text isn\'t even displayed anywhere.',
  advanced: `You already know how to use this.`,
  hidden: true,
  dms: true,
  hasPermission: isBotAdmin,
  async exec(msg){
    if(msg.content.includes("```js\n")) {
      const code = msg.content.substring(msg.content.indexOf("```js\n")+6,msg.content.lastIndexOf("```"));
      try{
        msg.channel.send("Returned: " + await eval(`(async()=>{${code}})()`));
      }catch(e){
        msg.channel.send(e.toString());
      }
    }else{
      msg.reply('Use a js code block!');
    }
  }
} as Command;
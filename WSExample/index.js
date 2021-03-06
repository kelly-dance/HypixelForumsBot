const WebSocket = require('ws');

const ws = new WebSocket('wss://hf.mcpqndq.dev/');

ws.on('open', () => {
  console.log('Connected')
  const interval = setInterval(() => ws.send('ping'), 30e3)

  ws.on('message', msg => {
    const data = JSON.parse(msg);
    if(data.type === 'post') console.log(data.data);
  });

  ws.on('close', () => clearInterval(interval));
});

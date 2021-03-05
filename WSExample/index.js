const WebSocket = require('ws');

const ws = new WebSocket('wss://hf.mcpqndq.dev/');

ws.on('open', () => {
  console.log('Connected')
});

ws.on('message', msg => {
  const data = JSON.parse(msg);
  console.log(data);
});

const WebSocket = require('ws');

// TODO: replace url with public url
const ws = new WebSocket('ws://localhost:5000/');

ws.on('open', () => {
  console.log('Connected')
});

ws.on('message', msg => {
  const data = JSON.parse(msg);
  console.log(data);
});

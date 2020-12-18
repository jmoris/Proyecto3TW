const WebSocket = require('ws');
const moment = require('moment');

const webSocketServer = new WebSocket.Server({ port: process.env.PORT || 8080 });

webSocketServer.on('connection', webSocket => {
  webSocket.on('message', message => {
    var dt = JSON.parse(message);
    dt.date = moment().format('lll');
    console.log('Received:', dt);
    broadcast(JSON.stringify(dt));
  });
});

function broadcast(data) {
  webSocketServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

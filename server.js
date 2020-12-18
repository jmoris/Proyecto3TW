const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', webSocket => {
  webSocket.on('message', message => {
    var dt = JSON.parse(message);
    console.log('Received:', dt);
    broadcast(message);
  });
});

function broadcast(data) {
  webSocketServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

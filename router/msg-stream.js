'use strict';

var fayeWrapper = require('../lib/faye');

var stream = (req, res) => {
  res.writeHead(200, {
    'Content-Type':   'text/event-stream',
    'Cache-Control':  'no-cache',
    'Connection':     'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  // Heartbeat
  var nln = () => res.write('\n');
  var hbt = setInterval(nln, 15000);

  // Retry
  res.write("retry: 500\n");

  var publish = (msg) => {
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(msg)}\n\n`);
    res.flush();
  };

  var roomId= req.params.roomId;
  var faye = new fayeWrapper(req.session.token);
  faye.client.subscribe(`/api/v1/rooms/${roomId}/chatMessages`, publish);

  // Clear heartbeat and listener
  req.on('close', () => {
    clearInterval(hbt);
    faye.client.disconnect();
  });
};

module.exports = stream;

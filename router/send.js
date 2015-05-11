'use strict';

var Gitter = require('../lib/gitter');

var send = (req, res) => {
  if (!req.session.token) return res.redirect('/');

  var room = req.body.room;
  var text = req.body.text;

  var gitter = new Gitter(req.session.token);
  gitter.post(`/v1/rooms/${room}/chatMessages`, {}, {text: text})
  .then( (msg) => {
    res.status(200).send(msg);
  })
  .catch( err => {
    console.log('ERR', err);
    res.status(500).send('Something went wrong');
  });
};

module.exports = send;

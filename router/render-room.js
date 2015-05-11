'use strict';

var _ = require('underscore');
var React = require('react/addons');
var ReactApp = React.createFactory(require('../public/components/app'));

var Gitter = require('../lib/gitter');

var room = (req, res) => {
  var gitter = new Gitter(req.session.token);

  return Promise.all([
    gitter.get(`/v1/rooms/${req.params.roomId}`, {limit: 50}),
    gitter.get(`/v1/rooms/${req.params.roomId}/chatMessages`, {limit: 50}),
    gitter.get(`/v1/rooms`)
  ])
  .then( values => {
    let [room, chatMessages, _rooms] = values;

    var allRooms = _rooms.filter( r => r.lastAccessTime );
    var sortedRooms =  _.sortBy(allRooms, 'lastAccessTime').reverse();
    var people = sortedRooms.filter( r => r.oneToOne ).slice(0,10);
    var rooms  = sortedRooms.filter( r => !r.oneToOne ).slice(0,10);

    var seed = {
      room: room,
      data: chatMessages,
      people: people,
      rooms: rooms
    };

    var reactHTML = React.renderToString(new ReactApp({seed: seed}));
    res.render('index.ejs', {reactHTML: reactHTML, seed: JSON.stringify(seed)});
  })
  .catch( err => {
    console.log('ERR', err);
    res.status(500).send('Something went wrong');
  });
};

module.exports = room;

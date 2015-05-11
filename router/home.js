'use strict';

var _ = require('underscore');
var Gitter = require('../lib/gitter');

var home = (req, res) => {
  if (!req.session.token) return res.render('login');

  var gitter = new Gitter(req.session.token);
  gitter.get('/v1/rooms')
  .then( (_rooms) => {
    var allRooms = _rooms.filter( r => r.lastAccessTime );
    var sortedRooms =  _.sortBy(allRooms, 'lastAccessTime').reverse();
    var people = sortedRooms.filter( r => r.oneToOne ).slice(0,10);
    var rooms  = sortedRooms.filter( r => !r.oneToOne ).slice(0,10);

    res.redirect(`/rooms/${rooms[0].id}`);
  })
  .catch( err => {
    console.log('ERR', err);
    res.status(500).send('Something went wrong');
  });
};

module.exports = home;

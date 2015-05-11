'use strict';

require('babel/register')({extensions: ['.js', '.jsx']});

var express       = require('express');
var bodyParser    = require('body-parser');
var serve_static  = require('serve-static');
var compression   = require('compression');
var session       = require('cookie-session');

var app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(serve_static('public'));
app.disable('x-powered-by');
app.use(session({secret: process.env.SESSION_SECRET}));

app.get('/', require('./router/home'));
app.use('/oauth', require('./router/oauth'));
app.post('/send', require('./router/send'));
app.get('/rooms/:roomId', require('./router/render-room'));
app.get('/rooms/:roomId/stream', require('./router/msg-stream'));

var port = process.env.PORT || 4321;
app.listen(port, function() {
  console.log('Ready: http://localhost:' + port);
});

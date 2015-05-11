'use strict';

var express = require('express');
var OAuth2 = require('oauth').OAuth2;

var OAUTH_KEY     = process.env.OAUTH_KEY;
var OAUTH_SECRET  = process.env.OAUTH_SECRET;
var BASEPATH      = 'https://gitter.im/';
var REDIRECT      = process.env.REDIRECT;

var auth = new OAuth2(OAUTH_KEY, OAUTH_SECRET, BASEPATH, 'login/oauth/authorize', 'login/oauth/token');

var login = (req, res) => {
  var url = auth.getAuthorizeUrl({
    redirect_uri: REDIRECT, 
    response_type: 'code'
  });
  res.redirect(url);
};

var callback = (req, res) => {
  var code = req.query.code;
  var params = {
    redirect_uri: REDIRECT, 
    grant_type: 'authorization_code'
  };

  auth.getOAuthAccessToken(code, params, (err, access_token) => {
    req.session.token = access_token;
    res.redirect('/');
  });
};

var logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

var app = express();

app.get('/login',    login);
app.get('/callback', callback);
app.get('/logout',   logout);

module.exports = app;

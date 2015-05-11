'use strict';

var debug = require('debug')('gitter');
var https = require('https');
var qs    = require('qs');

var Client = function(token) {
  this.token = token;
};

['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach(function(method) {
  Client.prototype[method.toLowerCase()] = function(path, query, body) {
    return this.request(method, path, query, body);
  };
});

Client.prototype.request = function(method, path, query, body) {
  debug(method, path, query, body);

  path = encodeURI(path);

  var headers = {
    'User-Agent': 'Gitter Client',
    'Accept'    : 'application/json'
  };

  if (this.token) {
    headers.Authorization = `Bearer ${this.token}`;
  } else {
    query = query || {};
    query.client_id = process.env.GHCLIENT;
    query.client_secret = process.env.GHSECRET;
  }
  
  if (body) headers['Content-Type'] = 'application/json';

  var options = {
    hostname: 'api.gitter.im',
    port:     443,
    method:   method,
    path:     query ? path + '?' + qs.stringify(query) : path,
    headers:  headers
  };

  return new Promise(function(resolve, reject) {
    var responseHandler = function(res) {
      res.setEncoding('utf8');

      var data = '';
      res.on('data', chunk => data += chunk );

      res.on('end', () => {
        debug(res.statusCode + ' ' + method + ' ' + options.path);
        try { resolve(JSON.parse(data)); } catch(err) { reject('Invalid JSON'); }
      });


      if ([200,201].indexOf(res.statusCode) === -1) {
        return reject(new Error(res.statusCode));
      }
    };

    var req = https.request(options, responseHandler);
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
};

module.exports = Client;

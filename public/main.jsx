require('./app.less');
require('./reset.css');

var React = require('react/addons');
var ReactApp = React.createFactory(require('./components/app'));

var mountNode = document.getElementById('react-app');
React.render(new ReactApp({seed: window.seed}), mountNode);

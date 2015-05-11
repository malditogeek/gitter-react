
var React = require('react/addons');

var Nav = require('./nav');
var Messages = require('./messages');
var Input = require('./input');

class ReactApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seed: props.seed
    };
  }

  render() {
    return (
      <div>
        <Nav room={this.state.seed.room} rooms={this.state.seed.rooms} people={this.state.seed.people}/>
        <Messages data={this.state.seed.data} room={this.state.seed.room} />
        <Input room={this.state.seed.room} />
      </div>
    )
  }
}

module.exports = ReactApp;  

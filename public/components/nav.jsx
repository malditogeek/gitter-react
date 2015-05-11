'use strict';

var React = require('react/addons');

class RosterItem extends React.Component {
  render() {
    return (
      <div className='roster-item'>
        <a href={'/rooms/' + this.props.room.id}>{this.props.room.uri}</a>
      </div>
    )
  }
}

class Roster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: 'hidden-menu',
    };
  }

  showMenu(evt) {
    evt.stopPropagation(); 
    evt.preventDefault();

    this.setState({
      menu: 'visible-menu',
    });
  }

  hideMenu() {
    this.setState({
      menu: 'hidden-menu',
    });
  }

  render() {
    var rosterItems = this.props.rooms.map( (room, index) => {
      return (
        <RosterItem room={room} key={index} />
      );
    });
    return (
      <div>
        <span className="btn menu octicon octicon-three-bars" onClick={this.showMenu.bind(this)}></span>
        <div className={this.state.menu} onClick={this.hideMenu.bind(this)}>
          {rosterItems}
        </div>
      </div>
    )
  }
}

class Nav extends React.Component {
  render() {
    return (
      <div className='nav'>
        <h1>{this.props.room.uri}</h1>
        <Roster rooms={this.props.rooms} people={this.props.people} />
      </div>
    )
  }
}

module.exports = Nav;

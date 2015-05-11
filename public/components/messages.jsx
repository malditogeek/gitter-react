'use strict';

var React = require('react/addons');

class Message extends React.Component {
  html() {
    return {__html: this.props.html};
  }

  render() {
    return (
      <div className='message'>
        <img className='avatar' src={this.props.author.avatarUrlMedium} />
        <div className='html' dangerouslySetInnerHTML={this.html()} />
        <div className='clear' />
      </div>
    )
  }
}

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      room: props.room
    }
  }

  scroll() {
    var el = document.getElementById('messages');
    window.scrollTo(0, el.scrollHeight);
  }

  componentDidMount() {
    var evtSource = new EventSource(`/rooms/${this.state.room.id}/stream`);
    evtSource.addEventListener('message', evt => {
      var msg = JSON.parse(evt.data);

      if (msg.operation === 'create') {
        this.state.data.shift();
        this.setState({
          date: this.state.data.push(msg.model)
        })
      };
    });

    this.scroll();
  }

  componentDidUpdate() {
    this.scroll();
  }

  render() {
    var messageNodes = this.state.data.map(function(msg, index) {
      return (
        <Message author={msg.fromUser} text={msg.text} html={msg.html} key={index} />
      );
    });
    return (
      <div id="messages" className="messages">
        {messageNodes}
      </div>
    )
  }
}

module.exports = Messages;

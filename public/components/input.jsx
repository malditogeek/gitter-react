var React = require('react/addons');
var agent = require('superagent');

class Input extends React.Component {
  submit(evt) {
    evt.stopPropagation(); 
    evt.preventDefault();

    var input = document.getElementById('input');
    var text = input.value;
    if (text === '') return;

    agent
    .post('/send')
    .send({room: this.props.room.id, text: text})
    .end( (err, res) => {
      if (res.ok) {
        input.value = '';
      } else {
        alert('Try again!');
      }
    });
  }

  render() {
    return (
      <div>
        <textarea className='input-textarea' id="input" placeholder="GitHub Style Markdown"></textarea>
        <span className="input-submit octicon octicon-arrow-right" onClick={this.submit.bind(this)}></span>
      </div>
    )
  }
}

module.exports = Input;

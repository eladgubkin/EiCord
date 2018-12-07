import React, { Component } from 'react'
import './Chat.css';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messages: []
    };
  }

  onChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  onClick = () => {
    this.setState({
      messages: [...this.state.messages, this.state.message]
    });
  }

  render() {
    return (
      <div id="Chat">
        <div className="messaages">
          <ul>
            {this.state.messages.map(message => <li>{message}   x</li>)}
          </ul>
        </div>
        <div className="send">
          <input type="text" onChange={this.onChange} />
          <input type="button" value="Send" onClick={this.onClick} />
        </div>
      </div>
    )
  }
}


export default Chat;
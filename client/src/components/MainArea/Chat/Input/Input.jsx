import React, { Component } from 'react';
import TextFieldGroup from '../../../common/TextFieldGroup';
import './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  emitMessage = e => {
    e.preventDefault();
    const { socket, friendID } = this.props;

    socket.emit('newMessage', { friendID, message: this.state.message });
    this.setState({
      message: ''
    });
  };

  render() {
    return (
      <div id="Input">
        <form noValidate onSubmit={this.emitMessage}>
          <TextFieldGroup
            type="text"
            name="message"
            onChange={this.onChange}
            value={this.state.message}
            placeholder="Type a message here"
          />
        </form>
        <div className="plus">
          <i className="far fa-paper-plane" onClick={this.emitMessage} />
        </div>
      </div>
    );
  }
}

export default Input;

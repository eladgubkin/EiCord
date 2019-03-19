import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import io from 'socket.io-client';
import Info from './Info/Info';
import ChatWindow from './ChatWindow/ChatWindow';
import Input from './Input/Input';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const socket = io.connect('http://localhost:5000');

    return (
      <div id="Chat">
        <div className="info">
          <Info />
        </div>
        <div className="chat-window">
          <ChatWindow />
        </div>
        <div className="input">
          <Input />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  null
)(Chat);

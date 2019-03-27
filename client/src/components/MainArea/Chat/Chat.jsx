import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearFriendId } from '../../../actions/chatActions';
import { getUserById, clearUserById } from '../../../actions/userActions';
import io from 'socket.io-client';
import Info from './Info/Info';
import ChatWindow from './ChatWindow/ChatWindow';
import Input from './Input/Input';
import Loading from '../../common/Loading';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null
    };
  }

  initSocket = () => {
    const socket = io.connect('http://localhost:5000', {
      query: `userID=${this.props.user.user.id}`
    });
    socket.on('connect', () => {
      console.log(`Connected! Socket Id = ${socket.id}`);
    });

    this.setState({ socket });
  };

  componentWillMount() {
    this.initSocket();

    const { friendID } = this.props.chat;
    if (friendID) {
      this.props.getUserById(friendID);
    }
  }

  componentWillUnmount() {
    this.props.clearFriendId();
    this.props.clearUserById();
  }

  render() {
    const { friendID } = this.props.chat;
    const { userById } = this.props.user;

    if (friendID === null || userById === null) {
      return <Loading background="#202225" />;
    }
    return (
      <div id="Chat">
        <div className="info">
          <Info />
        </div>

        <div className="chat-window">
          <PerfectScrollbar>
            <ChatWindow socket={this.state.socket} />
          </PerfectScrollbar>
        </div>

        <div className="input">
          <Input socket={this.state.socket} friendID={this.props.chat.friendID} />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  clearFriendId: PropTypes.func.isRequired,
  clearUserById: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserById, clearUserById, clearFriendId }
)(Chat);

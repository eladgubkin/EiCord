import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearFriendId, initSocket } from '../../../actions/chatActions';
import { getUserById, clearUserById } from '../../../actions/userActions';
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

  componentWillMount() {
    this.props.initSocket(this.props.user.user.id).then(() => {
      this.setState({
        socket: this.props.chat.socket
      });
    });

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
    const { socket } = this.state;

    if (friendID === null || userById === null || socket === null) {
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
  initSocket: PropTypes.func.isRequired,
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
  { initSocket, getUserById, clearUserById, clearFriendId }
)(Chat);

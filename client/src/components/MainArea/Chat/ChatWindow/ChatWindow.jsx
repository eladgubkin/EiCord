import React, { Component } from 'react';
import Loading from '../../../common/Loading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import './ChatWindow.css';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesFromMe: null,
      messagesSentToMe: null
    };
  }

  componentWillMount() {
    this.getMessages();
  }

  componentWillUnmount() {
    this.setState({
      messagesFromMe: null,
      messagesSentToMe: null
    });
  }

  getMessages = () => {
    const { socket } = this.props;
    const { friendID } = this.props.chat;

    socket.emit('getMessages', { friendID });
    socket.on('ReceiveMessages', messages => {
      this.setState({
        messagesFromMe: messages.messagesFromMe,
        messagesSentToMe: messages.messagesSentToMe
      });
    });
  };

  render() {
    const { messagesFromMe, messagesSentToMe } = this.state;
    const { user } = this.props.user;

    // const { socket } = this.props;
    // socket.on('YouShouldGetMessages', () => this.getMessages());

    if (messagesFromMe === null || messagesSentToMe === null) {
      return <Loading background="#202225" />;
    } else {
      const allMessages = [...messagesFromMe, ...messagesSentToMe];

      return (
        <div id="ChatWindow">
          {allMessages
            .sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            })
            .map((message, i) => {
              if (message.from === user.id) {
                return (
                  <div className="message message-from-me" key={i}>
                    <span className="date">
                      <Moment format="h:mm A">{message.date}</Moment>
                    </span>
                    <span className="text">{message.message}</span>
                  </div>
                );
              } else {
                return (
                  <div className="message message-sent-to-me" key={i}>
                    <span className="text">{message.message}</span>
                    <span className="date">
                      <Moment format="h:mm A">{message.date}</Moment>
                    </span>
                  </div>
                );
              }
            })}
        </div>
      );
    }
  }
}

ChatWindow.propTypes = {
  chat: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(ChatWindow);

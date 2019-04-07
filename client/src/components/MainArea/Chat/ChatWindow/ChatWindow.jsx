import React, { Component } from 'react';
import Loading from '../../../common/Loading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessages } from '../../../../actions/chatActions';
import Moment from 'react-moment';
import './ChatWindow.css';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null
    };
  }

  componentWillMount() {
    const { socket } = this.props;
    const { friendID } = this.props.chat;

    this.props.getMessages(friendID, socket).then(() => {
      this.setState({
        messages: this.props.chat.messages
      });
    });

    socket.on('newMessage', message => {
      this.setState({
        messages: this.state.messages.concat(message)
      });
    });
  }

  componentWillUnmount() {
    this.setState({
      messages: null
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.chat.messages
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { messages } = this.state;
    const { user } = this.props.user;

    if (messages === null) {
      return <Loading background="#202225" />;
    } else {
      return (
        <div id="ChatWindow">
          <div className="messageList">
            {messages
              .sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
              })
              .map((message, i) => {
                if (message.from === user.id) {
                  return (
                    <span className="message message-from-me" key={i}>
                      <span className="date">
                        <Moment format="h:mm A">{message.date}</Moment>
                      </span>
                      <span className="text">{message.message}</span>
                    </span>
                  );
                } else {
                  return (
                    <span className="message message-sent-to-me" key={i}>
                      <span className="text">{message.message}</span>
                      <span className="date">
                        <Moment format="h:mm A">{message.date}</Moment>
                      </span>
                    </span>
                  );
                }
              })}
          </div>
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
      );
    }
  }
}

ChatWindow.propTypes = {
  chat: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getMessages }
)(ChatWindow);

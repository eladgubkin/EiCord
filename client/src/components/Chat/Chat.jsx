import React from 'react';
import { Card } from 'reactstrap';
import user1 from '../../assets/images/users/6.jpg';
import ReactDOM from 'react-dom';
import Message from './Message.js';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import * as data from './chat-data.jsx';
import './Chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      other: data.messages,
      chats: data.chatlisting
    };
  }

  submitMessage = (e, chatindex) => {
    e.preventDefault();
    switch (chatindex) {
      case 'chat':
        this.setState(
          {
            chats: this.state.chats.concat([
              {
                username: 'Kevin Hsu',
                content: (
                  <span>{ReactDOM.findDOMNode(this.refs.msg).value}</span>
                ),
                img: user1
              }
            ])
          },
          () => {
            ReactDOM.findDOMNode(this.refs.msg).value = '';
          }
        );
        break;

      default:
    }
  };

  render() {
    const username = 'Kevin Hsu';
    const { chats } = this.state;

    return (
      <Card id="Chat">
        <div className="d-flex align-items-center p-3 border-bottom">
          <div className="mr-2">
            <img
              src={this.state.other[0].image}
              alt="user"
              className="rounded-circle"
              width="40"
            />
          </div>
          <div>
            <h5 className="message-title">{this.state.other[0].title}</h5>
          </div>
        </div>

        <ul className="chat-list p-4" ref="chats" style={{ height: '100%' }}>
          {chats.map((chat, index) => (
            <Message key={index} chat={chat} user={username} />
          ))}
        </ul>

        <form
          id="chat"
          onSubmit={e => this.submitMessage(e, e.target.id)}
          className="card-body border-top"
        >
          <div className="d-flex">
            <input
              placeholder="Type a message"
              ref="msg"
              className="form-control border-0"
              type="text"
            />
            <button
              className="btn btn-circle btn-lg btn-info float-right text-white"
              type="submit"
            >
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </form>
      </Card>
    );
  }
}

export default Chat;

import React, { Component } from 'react';
import img from '../../../../img/chat.png';
import './Chats.css';

class Chats extends Component {
  render() {
    return (
      <div id="Chats">
        <div className="landing">
          <img src={img} alt="" />
          <span className="title">No recent chats</span>
          <span className="desc">Go and chat with your friends!</span>
        </div>
      </div>
    );
  }
}

export default Chats;

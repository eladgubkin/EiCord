import React, { Component } from 'react';
import Chat from './Chat/Chat';
import './MainArea.css';

class MainArea extends Component {
  render() {
    return (
      <div id="MainArea">
        <Chat />
      </div>
    );
  }
}

export default MainArea;

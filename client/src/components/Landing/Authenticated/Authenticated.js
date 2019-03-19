import React, { Component } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import MainArea from '../../MainArea/MainArea';
import './Authenticated.css';

class Authenticated extends Component {
  render() {
    return (
      <div id="Authenticated">
        <div className="Sidebar">
          <Sidebar />
        </div>
        <div className="MainArea">
          <MainArea />
        </div>
      </div>
    );
  }
}

export default Authenticated;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotAuthenticated.css';

class NotAuthenticated extends Component {
  render() {
    return (
      <div id="NotAuthenticated">
        <h1>NotAuthenticated</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default NotAuthenticated;

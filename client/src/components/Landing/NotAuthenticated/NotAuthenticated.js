import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Landing.css';

class NotAuthenticated extends Component {
  render() {
    return (
      <div>
        <h1>NotAuthenticated</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default NotAuthenticated;

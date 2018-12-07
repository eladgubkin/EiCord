import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

// Components
import Navbar from './app/Navbar';
import Contacts from './app/Contacts';
import Chat from './app/Chat'

import './Landing.css'; // Style

class Landing extends Component {
  render() {
    const { isAuthenticated } = this.props.auth; //user is also here

    if (!isAuthenticated) {
      return (
        <div id="Landing">
          <div id="isGuest">
            <Link to="/register">Sign In</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      );
    }

    return (
      <div id="Landing">
        <div id="isAuth">
          <div id="line-top" />
          <Navbar />
          <Contacts />
          <Chat />
          <div id="Lobby"></div>
          <div id="line-bottom" />
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);

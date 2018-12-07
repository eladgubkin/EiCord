import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

// Components
import Navbar from './layout/Navbar';
import Contacts from './layout/Contacts';

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
          <div id="Chat" />
          <div id="Lobby" />
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

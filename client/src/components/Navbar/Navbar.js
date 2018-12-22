import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import './Navbar.css';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      redirectToSettings: false
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    return <Redirect to="/" />;
  };

  render() {
    return (
      <div id="Navbar">
        <nav className="main-nav">
          <div className="icon">
            <i className="fas fa-microphone" />
          </div>
          <div className="icon">
            <i className="fas fa-headphones" />
          </div>
          <div className="icon">
            <i className="fas fa-bell" />
          </div>
          <div className="icon" onClick={this.goToDash}>
            <i className="fas fa-user" />
          </div>
          <div className="icon" onClick={this.onLogoutClick} title="Logout?">
            <i className="fas fa-sign-out-alt" />
          </div>
        </nav>

        {this.state.redirectToSettings ? <Redirect to="/settings" /> : null}
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth
});

export default connect(
  mapStatetoProps,
  { logoutUser }
)(Navbar);

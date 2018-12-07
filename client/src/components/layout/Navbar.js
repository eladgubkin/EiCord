import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import './Navbar.css';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    return <Redirect to="/" />;
  };

  render() {
    return (
      <div>
        <div id="Navbar">
          <nav className="navbar">
            <div className="icon">
              <i className="fas fa-user" />
            </div>
            <div className="icon">
              <i className="fas fa-bell" />
            </div>
            <div className="icon">
              <i className="fas fa-home" />
            </div>
            <div className="icon">
              <i className="fas fa-comment" />
            </div>
            <div className="icon" onClick={this.onLogoutClick} title="Logout?">
              <i className="fas fa-cog" />
            </div>
          </nav>
        </div>
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

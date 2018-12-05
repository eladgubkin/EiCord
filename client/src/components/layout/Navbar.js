import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth; //user is here

    const authLinks = (
      <div>
        <a onClick={this.onLogoutClick}>Logout</a>
      </div>
    );

    const guestLinks = (
      <div>
        <Link to="/register">Sign In</Link>
        <Link to="/login">Login</Link>
      </div>
    );

    return (
      <div>
        <h3>Navbar</h3>
        {isAuthenticated ? authLinks : guestLinks}
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

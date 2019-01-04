import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    return <Redirect to="/" />;
  };

  render() {
    return (
      <div id="Menu">
        <div className="logout tip" onClick={this.onLogoutClick}>
          <i className="icon-logout" />
          <span className="tooltiptext">Logout</span>
        </div>
        <div
          className="editprofile tip"
          onClick={this.props.switchToEditProfile}
        >
          <i className="icon-pencil" />
          <span className="tooltiptext">Edit Profile</span>
        </div>
        <div className="home tip">
          <i className="icon-home" />
          <span className="tooltiptext">Home</span>
        </div>
        <div className="camera tip">
          <i className="icon-camrecorder" />
          <span className="tooltiptext">Disable Video Recorder</span>
        </div>
        <div className="settings tip">
          <i className="icon-settings" />
          <span className="tooltiptext">User Settings</span>
        </div>
        <div className="mic tip">
          <i className="icon-microphone" />
          <span className="tooltiptext">Mute</span>
        </div>
        <div className="headphones tip">
          <i className="icon-earphones" />
          <span className="tooltiptext">Deafen</span>
        </div>
        <div className="pin tip">
          <i className="icon-pin" />
          <span className="tooltiptext">Pinned Messages</span>
        </div>
        <div className="notifications tip">
          <i className="icon-bell" />
          <span className="tooltiptext">Notifications</span>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth
});

export default connect(
  mapStatetoProps,
  { logoutUser }
)(Menu);

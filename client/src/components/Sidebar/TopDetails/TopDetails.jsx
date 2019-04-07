import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../actions/userActions';
import { logoutUser } from '../../../actions/authActions';
import './TopDetails.css';

class TopDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props.user;

    return (
      <div id="TopDetails">
        <div className="avatar">
          {/* <img src={user.avatar} alt="Profile Pic" /> */}
          <img
            src={`https://ui-avatars.com/api?name=${user.firstName}+${
              user.lastName
            }&background=2b2c33&color=0078d4&size=128&rounded=true&font-size=0.33`}
            alt="Avatar"
          />
        </div>
        <div className="info">
          <span className="full-name">{`${user.firstName} ${user.lastName}`}</span>
          <span className="status">Online</span>
        </div>

        <div className="icons">
          <span className="dots">
            <i className="fas fa-cog" onClick={this.props.logoutUser} />
          </span>
          {/* <span className="mic">
            <i className="tooltip fas fa-microphone" title="Mute" />
          </span>
          <span className="headphones">
            <i className="tooltip fas fa-headphones" title="Deafen" />
          </span> */}
          {/* <span>
            <i className="tooltip fas fa-cog" title="User Settings" />
          </span> */}
        </div>
      </div>
    );
  }
}

TopDetails.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logoutUser, getCurrentUser }
)(TopDetails);

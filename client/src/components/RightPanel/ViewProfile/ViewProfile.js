import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../actions/userActions';
// import Moment from 'react-moment';
// import { CardBody, Row, Col } from 'reactstrap';
// import img1 from '../../../assets/images/background/profile-bg.jpg';
// import { Redirect } from 'react-router-dom';
import './ViewProfile.css';

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props.user;

    return (
      <div id="ViewProfile">
        <div className="profile-img">
          <img src={user.avatar} alt="Avatar" />
        </div>
        <div className="full-name">{`${user.firstName} ${user.lastName}`}</div>
        <div className="tagname">{`@${user.tagname}`}</div>
        <div className="bio">
          {user.bio ? (
            <span className="bio-text">{user.bio}</span>
          ) : (
            <span className="add-bio" onClick={this.props.switchToEditProfile}>
              <i className="ti-comment-alt" /> Add Bio
            </span>
          )}
        </div>

        <div className="location">
          {user.location ? (
            <span>
              <i className="icon-location-pin" /> {user.location}
            </span>
          ) : (
            <span
              className="add-location"
              onClick={this.props.switchToEditProfile}
            >
              <i className="icon-location-pin" /> Add location
            </span>
          )}
        </div>
        <div className="birthdate">
          {user.birthdate ? (
            <span>
              <i className="icon-present" /> {user.birthdate}
            </span>
          ) : (
            <span
              className="add-birthdate"
              onClick={this.props.switchToEditProfile}
            >
              <i className="icon-present" /> Add Birthday
            </span>
          )}
        </div>
      </div>
    );
  }
}

ViewProfile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(ViewProfile);

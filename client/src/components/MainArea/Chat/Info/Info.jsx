import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearFriendId } from '../../../../actions/chatActions';
import { getUserById, clearUserById } from '../../../../actions/userActions';
// import Loading from '../../../common/Loading';
import './Info.css';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { friendID } = this.props.chat;
    const { userById } = this.props.user;

    if (friendID !== userById._id) {
      this.props.getUserById(friendID);
    }

    return (
      <div id="Info">
        <div className="avatar">
          <img src={userById.avatar} alt="A" />
        </div>
        <div className="info">
          <div className="full-name">{`${userById.firstName} ${
            userById.lastName
          }`}</div>
          <div className="email">{userById.email}</div>
        </div>
        <div className="icons">
          <i className="fas fa-phone" />
          <i className="fas fa-video" />
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  user: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserById, clearUserById, clearFriendId }
)(Info);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllFriendships,
  confirmFriendRequest,
  DeclineFriendRequest
} from '../../../../actions/friendshipActions';
import { getUsersInfo, clearRequestersInfo } from '../../../../actions/userActions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Loading from '../../../common/Loading';
import isEmpty from '../../../../validation/is-empty';
import img from '../../../../img/notifications_emptystate_v3.png';
import './Notifications.css';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    this.props.clearRequestersInfo();
  }

  componentWillMount() {
    this.getAllNotifications();
  }

  getAllNotifications = () => {
    this.props.getAllFriendships().then(res => {
      const userID = this.props.user.user.id;
      const { friendships } = this.props.friendships;

      // Get all need-to-confirm friends
      const requestersID = [];
      friendships
        .filter(
          friendship =>
            friendship.isConfirmed === false && friendship.accepter === userID
        )
        .map(friendship => {
          const requesterID = friendship.requester;
          return requestersID.push(requesterID);
        });

      this.props.getUsersInfo({ requestersID });
    });
  };

  render() {
    const { requesters, loading } = this.props.user;
    // const { confirmSuccess } = this.props.friendships;

    if (requesters === null || loading) {
      return <Loading background="#23262c" />;
    } else {
      return (
        <div id="Notifications">
          {!isEmpty(requesters) ? (
            <PerfectScrollbar>
              <div className="requesters">
                <span className="title">Incoming Friend Requests</span>
                {requesters
                  .sort((a, b) =>
                    a.firstName !== b.firstName
                      ? a.firstName < b.firstName
                        ? -1
                        : 1
                      : 0
                  )
                  .map((requester, i) => {
                    return (
                      <div className="user" key={i}>
                        <span className="avatar">
                          <img src={requester.avatar} alt="Avatar" />
                        </span>
                        <div className="info">
                          <span className="full-name">
                            {`${requester.firstName} ${requester.lastName}`}
                          </span>
                          <span className="email">{requester.email}</span>
                        </div>
                        <div className="confirm">
                          <span className="yes">
                            <button
                              type="button"
                              onClick={() =>
                                this.props
                                  .confirmFriendRequest(requester._id)
                                  .then(() => this.getAllNotifications())
                              }
                            >
                              <i className="fas fa-check" />
                            </button>
                          </span>
                          <span className="no">
                            <button
                              type="button"
                              onClick={() =>
                                this.props
                                  .DeclineFriendRequest(requester._id)
                                  .then(() => this.getAllNotifications())
                              }
                            >
                              <i className="fas fa-times" />
                            </button>
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </PerfectScrollbar>
          ) : (
            <div className="no-notifications">
              <img src={img} alt="img" />
              <span className="no-new">No new notifications</span>
              <span className="desc">Check back to see new @ mentions</span>
            </div>
          )}
        </div>
      );
    }
  }
}

Notifications.propTypes = {
  confirmFriendRequest: PropTypes.func.isRequired,
  DeclineFriendRequest: PropTypes.func.isRequired,
  getUsersInfo: PropTypes.func.isRequired,
  clearRequestersInfo: PropTypes.func.isRequired,
  getAllFriendships: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  friendships: state.friendships,
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    getAllFriendships,
    clearRequestersInfo,
    getUsersInfo,
    confirmFriendRequest,
    DeclineFriendRequest
  }
)(Notifications);

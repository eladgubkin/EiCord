import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllFriendships } from '../../../../../actions/friendshipActions';
import {
  getUsersInfo,
  clearAcceptersInfo
} from '../../../../../actions/userActions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Loading from '../../../../common/Loading';
import isEmpty from '../../../../../validation/is-empty';
import img from '../../../../../img/pendingpng.png';
import './Pending.css';

class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    this.props.clearAcceptersInfo();
  }

  componentWillMount() {
    this.props.getAllFriendships().then(res => {
      const userID = this.props.user.user.id;
      const { friendships } = this.props.friendships;

      // Get all still-pending friends
      const acceptersID = [];
      friendships
        .filter(
          friendship =>
            friendship.isConfirmed === false && friendship.requester === userID
        )
        .map(friendship => {
          const accepterID = friendship.accepter;
          return acceptersID.push(accepterID);
        });

      this.props.getUsersInfo({ acceptersID });
    });
  }

  render() {
    const { accepters, loading } = this.props.user;

    if (accepters === null || loading) {
      return <Loading background="#23262c" />;
    } else {
      return (
        <div id="Pending">
          {!isEmpty(accepters) ? (
            <PerfectScrollbar>
              <div className="accepters">
                {accepters.map((accepter, i) => {
                  return (
                    <div className="user" key={i}>
                      <span className="avatar">
                        <img src={accepter.avatar} alt="Avatar" />
                      </span>
                      <div className="info">
                        <span className="full-name">
                          {`${accepter.firstName} ${accepter.lastName}`}
                        </span>
                        <span className="email">{accepter.email}</span>
                      </div>
                      <div
                        className="status"
                        onMouseEnter={e => (e.target.innerHTML = 'Cancel')}
                        onMouseLeave={e =>
                          (e.target.innerHTML = 'Friend Request Sent')
                        }
                      >
                        Friend Request Sent
                      </div>
                    </div>
                  );
                })}
              </div>
            </PerfectScrollbar>
          ) : (
            <div className="landing">
              <img src={img} alt="" />
              <span className="title">Pending friends</span>
              <span className="desc">There are no pending friend requests</span>
            </div>
          )}
        </div>
      );
    }
  }
}
Pending.propTypes = {
  getUsersInfo: PropTypes.func.isRequired,
  clearAcceptersInfo: PropTypes.func.isRequired,
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
    getUsersInfo,
    clearAcceptersInfo
  }
)(Pending);

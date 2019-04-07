import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllFriendships } from '../../../../actions/friendshipActions';
import {
  getUsersInfo,
  clearFriendsInfo,
  clearRequestersInfo,
  clearAcceptersInfo
} from '../../../../actions/userActions';
import { chatWithUser } from '../../../../actions/chatActions';
import Loading from '../../../common/Loading';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddFriend from './AddFriend/AddFriend';
import Pending from './Pending/Pending';
import isEmpty from '../../../../validation/is-empty';
import img from '../../../../img/high-five.png';
import './Friends.css';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Friends'
    };
  }

  changeTab = tab => {
    this.setState({
      currentTab: tab
    });
  };

  componentWillUnmount() {
    this.props.clearFriendsInfo();
  }

  componentWillMount() {
    this.props.getAllFriendships().then(res => {
      const userID = this.props.user.user.id;
      const { friendships } = this.props.friendships;

      // Get all confirmed friends
      const friendsID = [];
      friendships
        .filter(
          friendship =>
            friendship.isConfirmed === true &&
            (friendship.accepter === userID || friendship.requester === userID)
        )
        .map(friendship => {
          let friendID;

          friendship.requester === userID
            ? (friendID = friendship.accepter)
            : (friendID = friendship.requester);

          return friendsID.push(friendID);
        });

      this.props.getUsersInfo({ friendsID });
    });
  }

  render() {
    const { friendships, loading } = this.props.friendships;
    const { friends } = this.props.user;
    const { currentTab } = this.state;
    const { socket } = this.props.chat;

    if (friendships === null || friends === null || loading) {
      return <Loading background="#23262c" />;
    } else {
      return (
        <div id="Friends">
          <div className="top">
            <div className="nav">
              <div
                className={`${currentTab === 'AddFriend' ? 'active' : ''}`}
                onClick={() => this.changeTab('AddFriend')}
              >
                <i className="fas fa-user-plus" />
                <span>Add a friend</span>
              </div>
              <div
                className={`${currentTab === 'Friends' ? 'active' : ''}`}
                onClick={() => this.changeTab('Friends')}
              >
                <i className="fas fa-user-friends" />
                <span>All friends</span>
              </div>
              <div
                className={`${currentTab === 'Pending' ? 'active' : ''}`}
                onClick={() => this.changeTab('Pending')}
              >
                <i className="fas fa-user-clock" />
                <span>Pending friends</span>
              </div>
            </div>
          </div>
          {currentTab === 'Friends' ? (
            !isEmpty(friends) ? (
              <PerfectScrollbar>
                <div className="friends">
                  {friends
                    .sort((a, b) =>
                      a.firstName !== b.firstName
                        ? a.firstName < b.firstName
                          ? -1
                          : 1
                        : 0
                    )
                    .map((friend, i) => {
                      return (
                        <div
                          className="user"
                          key={i}
                          onClick={() => this.props.chatWithUser(friend._id, socket)}
                        >
                          <span className="avatar">
                            {/* <img src={friend.avatar} alt="Avatar" /> */}
                            <img
                              src={`https://ui-avatars.com/api?name=${
                                friend.firstName
                              }+${
                                friend.lastName
                              }&background=2b2c33&color=0078d4&size=128&rounded=true&font-size=0.33`}
                              alt="Avatar"
                            />
                          </span>
                          <div className="info">
                            <span className="full-name">
                              {`${friend.firstName} ${friend.lastName}`}
                            </span>
                            <span className="email">{friend.email}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </PerfectScrollbar>
            ) : (
              <div className="landing">
                <img src={img} alt="" />
                <span className="title">Find people on EiCord</span>
                <span className="desc">
                  Add people to your friends list and start chatting!
                </span>
              </div>
            )
          ) : null}

          {currentTab === 'AddFriend' ? <AddFriend /> : null}
          {currentTab === 'Pending' ? <Pending /> : null}
        </div>
      );
    }
  }
}

Friends.propTypes = {
  chatWithUser: PropTypes.func.isRequired,
  getUsersInfo: PropTypes.func.isRequired,
  clearFriendsInfo: PropTypes.func.isRequired,
  clearRequestersInfo: PropTypes.func.isRequired,
  clearAcceptersInfo: PropTypes.func.isRequired,
  getAllFriendships: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  friendships: state.friendships,
  user: state.user,
  chat: state.chat
});

export default connect(
  mapStateToProps,
  {
    getAllFriendships,
    chatWithUser,
    getUsersInfo,
    clearFriendsInfo,
    clearRequestersInfo,
    clearAcceptersInfo
  }
)(Friends);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/userActions';
import FriendProfile from './FriendProfile/FriendProfile';
// import Friends from './Friends/Friends';
import AllFriends from './AllFriends/AllFriends';
import OnlineFriends from './OnlineFriends/OnlineFriends';
import PendingFriends from './PendingFriends/PendingFriends';
import AddFriend from './AddFriend/AddFriend';
import './LeftPanel.css';

class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddFriend: false,
      showFriendProfile: false,
      showAllFriends: false,
      showOnlineFriends: true,
      showPendingFriends: false
    };
  }
  showAddFriend = () => {
    this.setState({
      showAddFriend: true,
      showFriendProfile: false,
      showAllFriends: false,
      showOnlineFriends: false,
      showPendingFriends: false
    });
  };

  showFriendProfile = () => {
    this.setState({
      showFriendProfile: true,
      showAddFriend: false,
      showAllFriends: false,
      showOnlineFriends: false,
      showPendingFriends: false
    });
  };

  showAllFriends = () => {
    this.setState({
      showFriendProfile: false,
      showAddFriend: false,
      showAllFriends: true,
      showOnlineFriends: false,
      showPendingFriends: false
    });
  };

  showOnlineFriends = () => {
    this.setState({
      showFriendProfile: false,
      showAddFriend: false,
      showAllFriends: false,
      showOnlineFriends: true,
      showPendingFriends: false
    });
  };

  showPendingFriends = () => {
    this.setState({
      showFriendProfile: false,
      showAddFriend: false,
      showAllFriends: false,
      showOnlineFriends: false,
      showPendingFriends: true
    });
  };

  render() {
    const {
      showAllFriends,
      showOnlineFriends,
      showPendingFriends,
      showAddFriend
    } = this.state;

    if (this.state.showFriendProfile) {
      return <FriendProfile showAllFriends={this.showAllFriends} />;
    } else {
      return (
        <div id="LeftPanel">
          <div className="top-nav">
            <div
              className={`all ${showAllFriends ? 'active' : ''}`}
              onClick={this.showAllFriends}
            >
              All
            </div>
            <div
              className={`online ${showOnlineFriends ? 'active' : ''}`}
              onClick={this.showOnlineFriends}
            >
              Online
            </div>
            <div
              className={`pending ${showPendingFriends ? 'active' : ''}`}
              onClick={this.showPendingFriends}
            >
              Pending
            </div>
            <div
              className={`add-friend ${showAddFriend ? 'active' : ''}`}
              onClick={this.showAddFriend}
            >
              <i className="icon-user-follow" />
            </div>
          </div>
          {showAllFriends ? (
            <AllFriends showFriendProfile={this.showFriendProfile} />
          ) : null}
          {showOnlineFriends ? (
            <OnlineFriends showFriendProfile={this.showFriendProfile} />
          ) : null}
          {showPendingFriends ? <PendingFriends /> : null}
          {showAddFriend ? <AddFriend /> : null}
        </div>
      );
    }
  }
}

LeftPanel.propTypes = {
  user: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(LeftPanel);

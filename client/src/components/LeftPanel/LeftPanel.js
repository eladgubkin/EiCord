import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/userActions';
import FriendProfile from './FriendProfile/FriendProfile';
// import Friends from './Friends/Friends';
import AllFriends from './AllFriends/AllFriends';
import OnlineFriends from './OnlineFriends/OnlineFriends';
import PendingFriends from './PendingFriends/PendingFriends';
import BlockedFriends from './BlockedFriends/BlockedFriends';
import AddFriend from './AddFriend/AddFriend';
import './LeftPanel.css';

class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddFriend: false,
      showFriendProfile: false,
      showAllFriends: true,
      showOnlineFriends: false,
      showPendingFriends: false,
      showBlockedFriends: false
    };
  }
  showAddFriend = () => {
    this.setState({
      showAddFriend: true,
      showFriendProfile: false,
      showAllFriends: false,
      showOnlineFriends: false,
      showPendingFriends: false,
      showBlockedFriends: false
    });
  };

  showFriendProfile = () => {
    this.setState({
      showFriendProfile: true,
      showAddFriend: false,
      showAllFriends: false,
      showOnlineFriends: false,
      showPendingFriends: false,
      showBlockedFriends: false
    });
  };

  showAllFriends = () => {
    this.setState({
      showFriendProfile: false,
      showAddFriend: false,
      showAllFriends: true,
      showOnlineFriends: false,
      showPendingFriends: false,
      showBlockedFriends: false
    });
  };

  showOnlineFriends = () => {
    this.setState({
      showFriendProfile: false,
      showAddFriend: false,
      showAllFriends: false,
      showOnlineFriends: true,
      showPendingFriends: false,
      showBlockedFriends: false
    });
  };

  showPendingFriends = () => {
    this.setState({
      showFriendProfile: false,
      showAddFriend: false,
      showAllFriends: false,
      showOnlineFriends: false,
      showPendingFriends: true,
      showBlockedFriends: false
    });
  };

  showBlockedFriends = () => {
    this.setState({
      showFriendProfile: false,
      showAddFriend: false,
      showAllFriends: false,
      showOnlineFriends: false,
      showPendingFriends: false,
      showBlockedFriends: true
    });
  };

  render() {
    const {
      showAllFriends,
      showOnlineFriends,
      showPendingFriends,
      showBlockedFriends
    } = this.state;

    if (this.state.showAddFriend) {
      return <AddFriend showAllFriends={this.showAllFriends} />;
    }
    if (this.state.showFriendProfile) {
      return <FriendProfile showAllFriends={this.showAllFriends} />;
    } else {
      return (
        <div id="LeftPanel">
          <div className="top-nav">
            <div className="all" onClick={this.showAllFriends}>
              All
            </div>
            <div className="online" onClick={this.showOnlineFriends}>
              Online
            </div>
            <div className="pending" onClick={this.showPendingFriends}>
              Pending
            </div>
            <div className="blocked" onClick={this.showBlockedFriends}>
              Blocked
            </div>
          </div>
          {showAllFriends ? (
            <AllFriends showFriendProfile={this.showFriendProfile} />
          ) : null}
          {showOnlineFriends ? (
            <OnlineFriends showFriendProfile={this.showFriendProfile} />
          ) : null}
          {showPendingFriends ? <PendingFriends /> : null}
          {showBlockedFriends ? <BlockedFriends /> : null}
        </div>

        // <Friends
        //   showAddFriend={this.showAddFriend}
        //   showFriendProfile={this.showFriendProfile}
        // />
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

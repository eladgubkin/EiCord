import React, { Component } from 'react';
import AllFriends from './AllFriends/AllFriends';
import OnlineFriends from './OnlineFriends/OnlineFriends';
import PendingFriends from './PendingFriends/PendingFriends';
import BlockedFriends from './BlockedFriends/BlockedFriends';
import './Friends.css';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOnlineFriends: true,
      showAllFriends: false,
      showPendingFriends: false,
      showBlockedFriends: false
    };
  }

  showAllFriends = () => {
    this.setState({
      showAllFriends: true,
      showOnlineFriends: false,
      showPendingFriends: false,
      showBlockedFriends: false
    });
  };

  showOnlineFriends = () => {
    this.setState({
      showOnlineFriends: true,
      showAllFriends: false,
      showPendingFriends: false,
      showBlockedFriends: false
    });
  };

  showPendingFriends = () => {
    this.setState({
      showPendingFriends: true,
      showAllFriends: false,
      showOnlineFriends: false,
      showBlockedFriends: false
    });
  };

  showBlockedFriends = () => {
    this.setState({
      showBlockedFriends: true,
      showAllFriends: false,
      showOnlineFriends: false,
      showPendingFriends: false
    });
  };

  render() {
    const {
      showAllFriends,
      showOnlineFriends,
      showPendingFriends,
      showBlockedFriends
    } = this.state;

    return (
      <div id="Friends">
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
          <AllFriends showFriendProfile={this.props.showFriendProfile} />
        ) : null}
        {showOnlineFriends ? (
          <OnlineFriends showFriendProfile={this.props.showFriendProfile} />
        ) : null}
        {showPendingFriends ? <PendingFriends /> : null}
        {showBlockedFriends ? <BlockedFriends /> : null}
      </div>
    );
  }
}

export default Friends;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Friends from './Friends/Friends';
import Notifications from './Notifications/Notifications';
import Chats from './Chats/Chats';
// import bell from '../../../img/bell.svg';

import './Tabs.css';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Friends',
      isChatsHovered: false,
      isFriendsHovered: false,
      isNotificationsHovered: false
    };
  }

  changeTab = tab => {
    this.setState({
      currentTab: tab
    });
  };

  handleHover = (e, type) => {
    e.preventDefault();

    this.setState({
      [type]: !this.state[type]
    });
  };

  render() {
    const { currentTab } = this.state;

    const chatsClass = this.state.isChatsHovered
      ? 'fas fa-comments'
      : 'far fa-comments';

    const friendsClass = this.state.isFriendsHovered
      ? 'fas fa-address-book'
      : 'far fa-address-book';

    const notificationsClass = this.state.isNotificationsHovered
      ? 'fas fa-bell'
      : 'far fa-bell';

    return (
      <div id="Tabs">
        <div className="menu">
          <div
            className={` ${currentTab === 'Chats' ? 'active' : ''}`}
            onMouseEnter={e => this.handleHover(e, 'isChatsHovered')}
            onMouseLeave={e => this.handleHover(e, 'isChatsHovered')}
            onClick={() => this.changeTab('Chats')}
          >
            <i className={chatsClass} />
            <span>Chats</span>
          </div>

          <div
            className={` ${currentTab === 'Friends' ? 'active' : ''}`}
            onMouseEnter={e => this.handleHover(e, 'isFriendsHovered')}
            onMouseLeave={e => this.handleHover(e, 'isFriendsHovered')}
            onClick={() => this.changeTab('Friends')}
          >
            <i className={friendsClass} />
            <span>Contacts</span>
          </div>

          <div
            className={` ${currentTab === 'Notifications' ? 'active' : ''}`}
            onMouseEnter={e => this.handleHover(e, 'isNotificationsHovered')}
            onMouseLeave={e => this.handleHover(e, 'isNotificationsHovered')}
            onClick={() => this.changeTab('Notifications')}
          >
            <i className={notificationsClass} />
            <span>Notifications</span>
          </div>
        </div>
        <div className="tab">
          {currentTab === 'Friends' ? <Friends /> : null}
          {currentTab === 'Notifications' ? <Notifications /> : null}
          {currentTab === 'Chats' ? <Chats /> : null}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Tabs);

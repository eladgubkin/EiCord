import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat/Chat';
import Loading from '../common/Loading';
import './MainArea.css';

class MainArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    const { friendID } = this.props.chat;

    if (user === null) {
      return <Loading background="#202225" />;
    }

    if (friendID) {
      return <Chat />;
    } else {
      return (
        <div id="MainArea">
          <div className="landing">
            <div className="welcome">
              <span> Welcome, {user.firstName}</span>
              {/* <img src={user.avatar} alt="Avatar" /> */}
              <img
                src={`https://ui-avatars.com/api?name=${user.firstName}+${
                  user.lastName
                }&background=2b2c33&color=0078d4&size=256&rounded=true&font-size=0.33`}
                alt="Avatar"
              />
            </div>
            <div className="desc">
              Search for someone to start chatting with or go to Contacts to see who
              is available.
            </div>
            <div className="signed-in">
              <span>
                You are signed in as <i>{user.email}</i>
              </span>
            </div>
          </div>
        </div>
      );
    }
  }
}

MainArea.propTypes = {};

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  null
)(MainArea);

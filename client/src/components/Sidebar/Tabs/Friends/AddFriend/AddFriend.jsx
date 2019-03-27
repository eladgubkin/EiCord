import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchUsers, clearSearchUsers } from '../../../../../actions/userActions';
import {
  sendFriendRequest,
  getAllFriendships
} from '../../../../../actions/friendshipActions';
import TextFieldGroup from '../../../../common/TextFieldGroup';
import PerfectScrollbar from 'react-perfect-scrollbar';
import isEmpty from '../../../../../validation/is-empty';
import img from '../../../../../img/search.png';
import './AddFriend.css';

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUnmount() {
    this.props.clearSearchUsers();
  }

  searchFriends = e => {
    e.preventDefault();
    const { searchInput } = this.state;
    // We make this input as obj because axios can only accept objs.
    const searchInputObj = {};
    searchInputObj.searchInput = searchInput;
    this.props
      .searchUsers(searchInputObj)
      .then(() => this.props.getAllFriendships());
  };

  render() {
    const { user } = this.props.users;
    let { users } = this.props.users;
    // const friendships = this.props.friendships.friendships;
    const { success } = this.props;

    if (users) {
      // We do this in order to not search current authenticated user.
      users = users.filter(a => {
        return a.id !== user.id;
      });

      // for (let i = 0; i < friendships.length; i++) {
      //   for (let j = 0; j < users.length; j++) {
      //     if (friendships[i].requester !== users[j].id) {
      //     }
      //   }
      // }
    }

    return (
      <div id="AddFriend">
        <div className="title">Search People</div>
        <div className="search-area">
          <form noValidate onSubmit={this.searchFriends} className="bar">
            <button className="search" onClick={this.searchFriends} type="submit">
              <i className="fas fa-search" />
            </button>
            <TextFieldGroup
              type="text"
              placeholder="Search"
              name="searchInput"
              onChange={this.onChange}
              value={this.state.searchInput}
              spellcheck="false"
            />
          </form>
        </div>
        <PerfectScrollbar>
          <div className="matched-users">
            {!isEmpty(users) ? (
              users
                .sort((a, b) =>
                  a.firstName !== b.firstName
                    ? a.firstName < b.firstName
                      ? -1
                      : 1
                    : 0
                )
                .map((user, i) => {
                  return (
                    <div className="user" key={i}>
                      <span className="avatar">
                        <img src={user.avatar} alt="Avatar" />
                      </span>
                      <div className="info">
                        <span className="full-name">
                          {`${user.firstName} ${user.lastName}`}
                        </span>
                        <span className="email">{user.email}</span>
                      </div>
                      <div className="icons">
                        {success ? (
                          <i className="fas fa-check" />
                        ) : (
                          <i
                            className="fas fa-user-plus"
                            onClick={() => this.props.sendFriendRequest(user.id)}
                          />
                        )}
                      </div>
                    </div>
                  );
                })
            ) : users === null ? (
              <div className="landing">
                <img src={img} alt="" />
                <span className="title">Search People</span>
                <span className="desc">
                  You can find people by their full name or email
                </span>
              </div>
            ) : (
              <div className="no-match">
                There are no users that match your search
              </div>
            )}
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

AddFriend.propTypes = {
  getAllFriendships: PropTypes.func.isRequired,
  clearSearchUsers: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  friendships: state.friendships,
  users: state.user,
  success: state.friendships.success
});

export default connect(
  mapStateToProps,
  { searchUsers, sendFriendRequest, clearSearchUsers, getAllFriendships }
)(AddFriend);

import React, { Component } from 'react';
import './AllFriends.css';
import img from '../../../assets/images/users/1.jpg';

class AllFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        {
          avatar: img,
          firstName: 'John',
          lastName: 'Doe',
          desc: 'Happy Birthday!',
          time: '9:10 PM',
          tagname: 'johndoe',
          status: 'online'
        },
        {
          avatar: img,
          firstName: 'John',
          lastName: 'Doe',
          desc: 'Happy Birthday!',
          time: '9:10 PM',
          tagname: 'johndoe',
          status: 'offline'
        },
        {
          avatar: img,
          firstName: 'John',
          lastName: 'Doe',
          desc: 'Happy Birthday!',
          time: '9:10 PM',
          tagname: 'johndoe',
          status: 'Away'
        },
        {
          avatar: img,
          firstName: 'John',
          lastName: 'Doe',
          desc: 'Happy Birthday!',
          time: '9:10 PM',
          tagname: 'johndoe',
          status: 'noDisturb'
        }
      ]
    };
  }

  render() {
    const { friends } = this.state;
    return (
      <div id="AllFriends">
        {friends.map((friend, index) => {
          return (
            <div
              className="friend-row"
              key={index}
              onClick={this.props.showFriendProfile}
            >
              <span className="profile-img">
                <img src={friend.avatar} alt="Avatar" />
              </span>
              <div className="info">
                <span className="full-name">
                  {`${friend.firstName} ${friend.lastName}`}
                </span>
                <span className="desc">{friend.desc}</span>
                <span className="time">{friend.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AllFriends;

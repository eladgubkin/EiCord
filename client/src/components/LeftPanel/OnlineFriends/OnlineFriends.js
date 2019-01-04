import React, { Component } from 'react';
import img2 from '../../../assets/images/users/2.jpg';
import './OnlineFriends.css';

class OnlineFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        {
          avatar: img2,
          firstName: 'Layla',
          lastName: 'Annie',
          desc: 'Good morning, this is me',
          time: '6:30 AM',
          tagname: 'johndoe'
        },
        {
          avatar: img2,
          firstName: 'Layla',
          lastName: 'Annie',
          desc: 'Good morning, this is me',
          time: '6:30 AM',
          tagname: 'johndoe'
        },
        {
          avatar: img2,
          firstName: 'Layla',
          lastName: 'Annie',
          desc: 'Good morning, this is me',
          time: '6:30 AM'
        },
        {
          avatar: img2,
          firstName: 'Layla',
          lastName: 'Annie',
          desc: 'Good morning, this is me',
          time: '6:30 AM',
          tagname: 'johndoe'
        },
        {
          avatar: img2,
          firstName: 'Layla',
          lastName: 'Annie',
          desc: 'Good morning, this is me',
          time: '6:30 AM'
        }
      ]
    };
  }
  render() {
    const { friends } = this.state;
    return (
      <div id="OnlineFriends">
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

export default OnlineFriends;

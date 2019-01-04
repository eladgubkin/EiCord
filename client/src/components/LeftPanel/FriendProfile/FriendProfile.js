import React, { Component } from 'react';
import { Button } from 'reactstrap';

class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>FriendProfile</h1>

        <Button
          onClick={this.props.showAllFriends}
          color="info"
          className="btn mt-3"
          size="lg"
        >
          Go Back
        </Button>
      </div>
    );
  }
}

export default FriendProfile;

import React, { Component } from 'react';
import { Button } from 'reactstrap';

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Add Friend</h1>
        <Button
          onClick={this.props.showAllFriends}
          color="info"
          className="btn mt-3"
          size="lg"
        >
          <i className="fas fa-user-plus" /> Go To Friends
        </Button>
      </div>
    );
  }
}

export default AddFriend;

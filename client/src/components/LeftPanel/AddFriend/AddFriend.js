import React, { Component } from 'react';
import TextFieldGroup from '../../common/TextFieldGroup';
import './AddFriend.css';

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendFriendRequest = e => {
    e.preventDefault();

    const { input } = this.state;
    console.log(input);
  };

  render() {
    const { errors } = this.state;

    return (
      <div id="AddFriend">
        <div className="addfriend">
          <form noValidate onSubmit={this.sendFriendRequest}>
            <TextFieldGroup
              label="Search friend"
              type="text"
              name="input"
              onChange={this.onChange}
              value={this.state.input}
              placeholder="Search"
              error={errors.input}
            />
            <button type="submit" className="button">
              <i className="icon-magnifier" />
            </button>
          </form>
        </div>
        <div className="suggestions" />
      </div>
    );
  }
}

export default AddFriend;

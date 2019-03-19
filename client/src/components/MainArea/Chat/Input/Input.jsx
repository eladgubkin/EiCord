import React, { Component } from 'react';
import TextFieldGroup from '../../../common/TextFieldGroup';
import './Input.css';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div id="Input">
        <TextFieldGroup
          type="text"
          name="input"
          onChange={this.onChange}
          value={this.state.input}
          placeholder="Type a message here"
        />

        <div className="plus">
          <i className="fas fa-plus" />
        </div>
      </div>
    );
  }
}

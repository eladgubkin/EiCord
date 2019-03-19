import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Info.css';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  render() {
    return (
      <div id="Info">
        <div className="avatar">
          <img src="" alt="A" />
        </div>
        <div className="info">
          <div className="full-name">Test User</div>
          <div className="status">Away</div>
        </div>
        <div className="icons">
          <i className="fas fa-phone" />
          <i className="fas fa-video" />
        </div>
      </div>
    );
  }
}

Info.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  null
)(Info);

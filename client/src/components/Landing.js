import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './layout/Navbar';

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Landing</h1>
        <Navbar />
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);

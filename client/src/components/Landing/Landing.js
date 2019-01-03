import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Authenticated from './Authenticated/Authenticated';
import NotAuthenticated from './NotAuthenticated/NotAuthenticated';
import './Landing.css';

class Landing extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    if (!isAuthenticated) {
      return <NotAuthenticated isAuthenticated={isAuthenticated} />;
    }

    return <Authenticated isAuthenticated={isAuthenticated} />;
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);

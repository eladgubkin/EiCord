import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/userActions';
import Loading from '../common/Loading';
import EditProfile from './EditProfile';
import ViewProfile from './ViewProfile';

import './RightPanel.css';

class RightPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditProfile: false
    };
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  onClick = () => {
    this.setState({
      showEditProfile: !this.state.showEditProfile
    });
  };

  render() {
    const { user, loading } = this.props.user;
    const { showEditProfile } = this.state;

    if (user === null || loading) {
      return <Loading />;
    } else {
      if (showEditProfile) {
        return <EditProfile switchToViewProfile={this.onClick} />;
      } else {
        return <ViewProfile switchToEditProfile={this.onClick} />;
      }
    }
  }
}

RightPanel.propTypes = {
  user: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(RightPanel);

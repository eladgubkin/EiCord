import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/userActions';
import Loading from '../common/Loading';
import EditProfile from './EditProfile/EditProfile';
import ViewProfile from './ViewProfile/ViewProfile';
import Menu from './Menu/Menu';
// import { Animated } from 'react-animated-css';

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
        return (
          <div id="RightPanel">
            <div className="ViewProfile">
              <ViewProfile switchToEditProfile={this.onClick} />
            </div>
            <div className="Menu">
              <Menu switchToEditProfile={this.onClick} />
            </div>
          </div>
        );
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/userActions';
import TopDetails from './TopDetails/TopDetails';
import Tabs from './Tabs/Tabs';
import Loading from '../common/Loading';
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { user, loading } = this.props.user;

    if (user === null || loading) {
      return <Loading background="#23262c" />;
    } else {
      return (
        <div id="Sidebar">
          <div className="TopDetails-section">
            <TopDetails />
          </div>
          <div className="Tabs-section">
            <Tabs />
          </div>
        </div>
      );
    }
  }
}

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Sidebar);

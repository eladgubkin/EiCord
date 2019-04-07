import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '../../Sidebar/Sidebar';
import MainArea from '../../MainArea/MainArea';
import { initSocket } from '../../../actions/chatActions';
import './Authenticated.css';

class Authenticated extends Component {
  componentDidMount() {
    this.props.initSocket(this.props.id);
  }

  render() {
    return (
      <div id="Authenticated">
        <div className="Sidebar">
          <Sidebar />
        </div>
        <div className="MainArea">
          <MainArea />
        </div>
      </div>
    );
  }
}

Authenticated.propTypes = {
  initSocket: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { initSocket }
)(Authenticated);

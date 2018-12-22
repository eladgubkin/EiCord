import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

// Components
import Navbar from '../Navbar/Navbar';
import Contacts from '../Contacts/Contacts';
import RightPanel from '../RightPanel/RightPanel';
import Chat from '../Chat/Chat.jsx';

import './Landing.css';

class Landing extends Component {
  render() {
    const { isAuthenticated } = this.props.auth; //user is also here

    if (!isAuthenticated) {
      return (
        <div id="Landing">
          <div id="isGuest">
            <Link to="/register">Sign In</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      );
    }

    return (
      <div id="Landing">
        <div id="isAuth">
          <div id="line-top" />
          <div id="line-bottom" />
          <div className="main-area">
            <Row style={{ background: '#263238' }}>
              <Col md="3" style={{ paddingRight: '0' }}>
                <Contacts />
              </Col>
              <Col md="6" className="nopadding">
                <Chat />
              </Col>
              <Col md="3" className="nopadding">
                <RightPanel />
              </Col>
            </Row>
          </div>
          <Navbar />
        </div>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/userActions';
import Moment from 'react-moment';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import img1 from '../../assets/images/background/profile-bg.jpg';

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props.user;

    return (
      <Card id="Profile">
        <img src={img1} alt="" style={{ width: '100%' }} />
        <CardBody className="little-profile text-center color">
          <div className="pro-img">
            <img src={user.avatar} alt="user" />
          </div>
          <h3 className="color mb-0">{`${user.firstName} ${user.lastName}`}</h3>
          {user.tagname ? (
            <p className="text-muted">{`@${user.tagname}`}</p>
          ) : null}

          {user.bio ? (
            <p>
              <small>{user.bio}</small>
            </p>
          ) : null}

          {user.location ? (
            <Row>
              <Col lg="12" md="12">
                <i className="icon-location-pin" /> {user.location}
              </Col>
            </Row>
          ) : null}

          {user.birthdate ? (
            <Row>
              <Col lg="12" md="12" className="mt-2">
                <i className="fas fa-birthday-cake" /> Born {user.birthdate}
              </Col>
            </Row>
          ) : null}

          <Row>
            <Col lg="12" md="12" className="mt-2">
              <i className="icon-calender" /> Joined{' '}
              <Moment format="MMMM YYYY">{user.createdAt}</Moment>
            </Col>
          </Row>
        </CardBody>
        <Button
          onClick={this.props.switchToEditProfile}
          color="info"
          className="btn mt-3"
          size="lg"
        >
          <i className="icon-pencil" /> Edit Profile
        </Button>
      </Card>
    );
  }
}

ViewProfile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(ViewProfile);

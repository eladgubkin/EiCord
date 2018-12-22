import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser, getCurrentUser } from '../../actions/userActions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
} from 'reactstrap';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props.user;

    this.state = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      tagname: user.tagname,
      location: user.location,
      bio: user.bio,
      birthdate: user.birthdate,
      errors: {
        placeholder:
          'This is a placeholder so that the object will not be empty'
      }
    };
  }

  componentDidUpdate() {
    if (Object.keys(this.state.errors).length === 0) {
      this.props.switchToViewProfile();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSave = () => {
    const userData = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      tagname: this.state.tagname,
      location: this.state.location,
      birthdate: this.state.birthdate,
      bio: this.state.bio
    };

    this.props.updateUser(userData);
  };

  render() {
    const { user } = this.props.user;
    const { errors } = this.state;

    return (
      <Card id="Profile">
        <PerfectScrollbar>
          <CardBody>
            <Form noValidate autoComplete="off">
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  defaultValue={user.firstName}
                  onChange={this.onChange}
                />
                <FormText color="danger">{errors.firstName}</FormText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="First Name"
                  defaultValue={user.lastName}
                  onChange={this.onChange}
                />
                <FormText color="danger">{errors.lastName}</FormText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="tagname">Tagname</Label>
                <Input
                  type="text"
                  name="tagname"
                  placeholder="@tagname"
                  defaultValue={user.tagname}
                  onChange={this.onChange}
                />
                <FormText color="danger">{errors.tagname}</FormText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="location">Country / Region</Label>
                <Input
                  type="text"
                  name="location"
                  placeholder="Country / Region"
                  defaultValue={user.location}
                  onChange={this.onChange}
                />
                <FormText color="danger">{errors.location}</FormText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="birthdate">Birthdate</Label>
                <Input
                  type="text"
                  name="birthdate"
                  placeholder="Birthdate"
                  defaultValue={user.birthdate}
                  onChange={this.onChange}
                />
                <FormText color="danger">{errors.birthdate}</FormText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  type="textarea"
                  rows="6"
                  name="bio"
                  placeholder="Bio"
                  defaultValue={user.bio}
                  onChange={this.onChange}
                />
                <FormText color="danger">{errors.bio}</FormText>
              </FormGroup>
            </Form>
          </CardBody>
        </PerfectScrollbar>
        <Button
          onClick={this.onSave}
          color="info"
          className="btn mt-3"
          size="lg"
        >
          Save Profile
        </Button>
      </Card>
    );
  }
}

EditProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateUser, getCurrentUser }
)(EditProfile);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateUser,
  getCurrentUser,
  setUserLoading
} from './../../../actions/userActions';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import './EditProfile.css';

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
    setUserLoading();
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
      <div id="EditProfile">
        <div className="editprofile">
          <img src={user.avatar} alt="user" className="profile-img" />
          <div className="form">
            <form noValidate>
              <TextFieldGroup
                label="First Name"
                name="firstName"
                onChange={this.onChange}
                value={this.state.firstName}
                error={errors.firstName}
                placeholder="John"
              />
              <TextFieldGroup
                label="Last Name"
                name="lastName"
                onChange={this.onChange}
                value={this.state.lastName}
                error={errors.lastName}
                placeholder="Doe"
              />
              <TextFieldGroup
                label="Tagname"
                name="tagname"
                onChange={this.onChange}
                value={this.state.tagname}
                error={errors.tagname}
                placeholder="johndoe123"
              />
              <TextFieldGroup
                label="Country / Region"
                name="location"
                onChange={this.onChange}
                value={this.state.location}
                error={errors.location}
                placeholder="City, Region, Country"
              />
              <TextFieldGroup
                label="Birthdate"
                name="birthdate"
                onChange={this.onChange}
                value={this.state.birthdate}
                error={errors.birthdate}
                placeholder="MMMM DD, YYYY"
              />
              <TextAreaFieldGroup
                rows="6"
                cols="50"
                label="Bio"
                name="bio"
                onChange={this.onChange}
                value={this.state.bio}
                error={errors.bio}
                placeholder="Describe who you are"
              />
              <button type="button" onClick={this.onSave} className="button">
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  setUserLoading: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateUser, getCurrentUser, setUserLoading }
)(EditProfile);

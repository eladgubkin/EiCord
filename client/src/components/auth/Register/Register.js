import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';
import './Register.css'; // Style

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
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
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div id="Register">
        <div className="register">
          <div className="brand">
            <h1>EiCord</h1>
          </div>
          <div className="title">Create an account</div>
          <div className="form">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="side-by-side">
                <TextFieldGroup
                  label="First Name"
                  type="firstName"
                  name="firstName"
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                />
                <TextFieldGroup
                  label="Last Name"
                  type="lastName"
                  name="lastName"
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                />
              </div>
              <TextFieldGroup
                label="Email"
                type="email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
              />
              <TextFieldGroup
                label="Password"
                type="password"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
              />

              <button type="submit" className="btn">
                Continue
              </button>
              <div className="account">
                <Link to="/login" className="login">
                  Already have an account?
                </Link>
              </div>
              {/* <div className="terms">
                  By registering, you agree to EiCord's{' '}
                  <span className="link">Terms of Service</span> and{' '}
                  <span className="link">Privacy Policy</span>.
                </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

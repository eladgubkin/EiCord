import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import { Animated } from 'react-animated-css';
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
      password2: '',
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
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div id="Register">
        <div className="form">
          <ul className="tab-group">
            <li className="tab active">
              <Link to="/register">Sign Up</Link>
            </li>
            <li className="tab">
              <Link to="/login">Log In</Link>
            </li>
          </ul>
          <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <div id="signup">
              <h1>Sign Up For Free</h1>
              <form noValidate onSubmit={this.onSubmit} autoComplete="off">
                <div className="top-row">
                  <TextFieldGroup
                    label="First Name"
                    name="firstName"
                    onChange={this.onChange}
                    value={this.state.firstName}
                    error={errors.firstName}
                    required="required"
                  />
                  <TextFieldGroup
                    label="Last Name"
                    name="lastName"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    error={errors.lastName}
                    required="required"
                  />
                </div>
                <TextFieldGroup
                  label="Email Address"
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  required="required"
                />
                <TextFieldGroup
                  label="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  required="required"
                />
                <TextFieldGroup
                  label="Confirm Password"
                  type="password"
                  name="password2"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  required="required"
                />
                <button className="button button-block">Get Started</button>
              </form>
            </div>
          </Animated>
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

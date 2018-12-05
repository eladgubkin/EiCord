import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import { Animated } from 'react-animated-css';

import './Login.css'; // Style

class Login extends Component {
  constructor() {
    super();
    this.state = {
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div id="Login">
        <div className="form">
          <ul className="tab-group">
            <li className="tab">
              <Link to="/register">Sign Up</Link>
            </li>
            <li className="tab active">
              <Link to="/login">Log In</Link>
            </li>
          </ul>

          <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <div id="login">
              <h1>Welcome Back!</h1>
              <form noValidate onSubmit={this.onSubmit} autoComplete="off">
                <div className="field-wrap">
                  <label>
                    Email Address<span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  {errors.email && <div className="error-feedback">{errors.email}</div>}
                </div>
                <div className="field-wrap">
                  <label>
                    Password<span className="req">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  {errors.password && <div className="error-feedback">{errors.password}</div>}
                </div>
                <p className="forgot">
                  <Link to="/">Forgot Password?</Link>
                </p>

                <button className="button button-block">Log In</button>
              </form>
            </div>
          </Animated>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

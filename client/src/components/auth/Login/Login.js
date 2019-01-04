import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
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
        <div className="login">
          <div className="brand">
            <h1>EiCord</h1>
          </div>
          <div className="title">Welcome back!</div>
          <div className="title-desc">We're so excited to see you again!</div>
          <div className="form">
            <form noValidate onSubmit={this.onSubmit}>
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
              <div className="forgot">Forgot your password?</div>

              <button type="submit" className="btn">
                Login
              </button>
              <div className="account">
                Need an account?{' '}
                <Link to="/register" className="register">
                  Register
                </Link>
              </div>
            </form>
          </div>
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

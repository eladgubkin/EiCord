import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { Animated } from 'react-animated-css';
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
                  <div className="field-wrap">
                    <label>
                      First Name<span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={this.onChange}
                      value={this.state.firstName}
                      error={errors.firstName}
                    />
                    {errors.firstName && <div className="error-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="field-wrap">
                    <label>
                      Last Name<span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={this.onChange}
                      value={this.state.lastName}
                      error={errors.lastName}
                    />
                    {errors.lastName && <div className="error-feedback">{errors.lastName}</div>}
                  </div>
                </div>
                <div className="field-wrap">
                  <label>
                    Email Address<span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
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
                    error={errors.password}
                  />
                  {errors.password && <div className="error-feedback">{errors.password}</div>}
                </div>
                <div className="field-wrap">
                  <label>
                    Confirm Password<span className="req">*</span>
                  </label>
                  <input
                    type="password"
                    name="password2"
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.email}
                  />
                  {errors.password2 && <div className="error-feedback">{errors.password2}</div>}
                </div>
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

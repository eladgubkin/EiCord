const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.firstName, { min: 2, max: 20 })) {
    errors.firstName = 'First name must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'This field is required';
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 20 })) {
    errors.lastName = 'Last name must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'This field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 64 })) {
    errors.password = 'Must be between 6 and 64 in length';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

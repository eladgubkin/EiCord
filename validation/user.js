const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserInput(data) {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

  try {
    if (data.firstName[0].toUpperCase() !== data.firstName[0]) {
      errors.firstName = 'Must start with an uppercase letter';
    }

    if (data.lastName[0].toUpperCase() !== data.lastName[0]) {
      errors.lastName = 'Must start with an uppercase letter';
    }
  } catch (TypeError) {
    if (Validator.isEmpty(data.firstName)) {
      errors.firstName = 'This field is required';
    }

    if (Validator.isEmpty(data.lastName)) {
      errors.lastName = 'This field is required';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

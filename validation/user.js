const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserInput(data) {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.tagname = !isEmpty(data.tagname) ? data.tagname : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.birthdate = !isEmpty(data.birthdate) ? data.birthdate : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';

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

  if (!Validator.isAlphanumeric(data.tagname, 'en-US')) {
    errors.tagname = 'can only contain letters and numbers';
  }

  if (!Validator.isLength(data.tagname, { min: 2, max: 20 })) {
    errors.tagname = 'Needs to be between 2 and 20 characters';
  }

  if (!Validator.isLength(data.bio, { max: 160 })) {
    errors.bio = 'Length of bio needs to be up to 160 characters';
  }

  if (Validator.isEmpty(data.tagname)) {
    errors.tagname = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

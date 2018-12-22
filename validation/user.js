const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserInput(data) {
  let errors = {};

  if (data.firstName[0].toUpperCase() !== data.firstName[0]) {
    errors.firstName = 'First name must start with an uppercase letter';
  }

  if (data.lastName[0].toUpperCase() !== data.lastName[0]) {
    errors.lastName = 'Last name must start with an uppercase letter';
  }

  if (!Validator.isLength(data.tagname, { min: 2, max: 15 })) {
    errors.tagname = 'Tagname needs to be between 2 and 15 characters';
  }

  if (!Validator.isLength(data.bio, { min: 2, max: 150 })) {
    errors.bio = 'Bio needs to be between 2 and 150 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

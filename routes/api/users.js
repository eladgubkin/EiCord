const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUserInput = require('../../validation/user');

// Load  User model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email.toLowerCase();

  User.findOne({
    email
  }).then(user => {
    if (user) {
      errors.email = 'email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //Size,
        r: 'pg', //Rating
        d: 'mm' //Default
      });

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login user: Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          // Create JWT Payload
          id: user.id
        };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '12h' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      avatar: req.user.avatar,
      tagname: req.user.tagname,
      location: req.user.location,
      bio: req.user.bio,
      birthdate: req.user.birthdate,
      createdAt: req.user.createdAt
    });
  }
);

// @route   POST api/users/update
// @desc    Edit user
// @access  Private
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const Fields = {};

    if (req.body.firstName) Fields.firstName = req.body.firstName;
    if (req.body.lastName) Fields.lastName = req.body.lastName;
    if (req.body.tagname) Fields.tagname = req.body.tagname;
    if (req.body.location) Fields.location = req.body.location;
    if (req.body.birthdate) Fields.birthdate = req.body.birthdate;
    if (req.body.bio) Fields.bio = req.body.bio;

    User.findOneAndUpdate({ _id: req.body.id }, { $set: Fields }, { new: true })
      .then(user => res.json(user))
      .catch(err => console.log(err));
  }
);

module.exports = router;

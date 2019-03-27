const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const Validator = require('validator');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUserInput = require('../../validation/user');

// Load  User model
const User = require('../../models/User');

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // const tag = Math.floor(1000 + Math.random() * 9000);
  const email = req.body.email.toLowerCase();

  User.findOne({
    email
  }).then(user => {
    if (user) {
      errors.email = 'Email is already registered';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size,
        r: 'pg', // Rating
        d: 'mm' // Default
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

// @route   POST api/user/login
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
        jwt.sign(payload, keys.secretOrKey, { expiresIn: '12h' }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/user/current
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
      createdAt: req.user.createdAt
    });
  }
);

// @route   POST api/user/update
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

    const Fields = {};

    if (req.body.firstName) Fields.firstName = req.body.firstName;
    if (req.body.lastName) Fields.lastName = req.body.lastName;

    User.findOneAndUpdate({ _id: req.body.id }, { $set: Fields }, { new: true })
      .then(user => res.json(user))
      .catch(err => console.log(err));
  }
);

// @route   POST api/user/search
// @desc    Search for user - returns matching users
// @access  Private
router.post(
  '/search',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { searchInput } = req.body;

    if (Validator.isEmail(searchInput)) {
      User.find({ email: searchInput })
        .then(result => {
          const users = [];

          result.forEach(user => {
            users.push({
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.avatar,
              email: user.email
            });
          });

          res.json(users);
        })
        .catch(err => console.log(err));
    } else if (searchInput) {
      User.find({ $text: { $search: searchInput } })
        .then(result => {
          const users = [];

          result.forEach(user => {
            users.push({
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.avatar,
              email: user.email
            });
          });

          res.json(users);
        })
        .catch(err => console.log(err));
    }
  }
);

// @route   GET api/user/info
// @desc    Get all information about requested users
// @access  Private
router.post(
  '/info',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { friendsID, requestersID, acceptersID } = req.body;

    if (friendsID) {
      User.find({ _id: { $in: friendsID } })
        .then(docs => res.json(docs))
        .catch(err => console.log(err));
    }

    if (requestersID) {
      User.find({ _id: { $in: requestersID } })
        .then(docs => res.json(docs))
        .catch(err => console.log(err));
    }

    if (acceptersID) {
      User.find({ _id: { $in: acceptersID } })
        .then(docs => res.json(docs))
        .catch(err => console.log(err));
    }
  }
);

// @route   POST api/user/by-id
// @desc    Get user by Id
// @access  Private
router.post(
  '/by-id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.body;
    User.findById(id)
      .then(docs => res.json(docs))
      .catch(err => console.log(err));
  }
);

module.exports = router;

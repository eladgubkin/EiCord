const express = require('express');
const router = express.Router();
const passport = require('passport');

const Friendship = require('../../models/Friendship');
const isEmpty = require('../../validation/is-empty');

// @route   GET api/friendships/all
// @desc    Get all friendships
// @access  Private
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  Friendship.find({})
    .then(friendships => res.json(friendships))
    .catch(err => console.log(err));
});

// @route   POST api/friendships/request
// @desc    Send friend request
// @access  Private
router.post(
  '/request',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { accepterID } = req.body;

    Friendship.find(
      { requester: req.user.id, accepter: accepterID },
      (err, result) => {
        if (err) throw err;
        if (isEmpty(result)) {
          const newFriendship = new Friendship({
            requester: req.user.id,
            accepter: accepterID
          });
          newFriendship
            .save()
            .then(res.json({ success: true }))
            .catch(err => console.log(err));
        } else {
          res.json({ success: false });
        }
      }
    );
  }
);

// @route   POST api/friendships/confirm
// @desc    Confirm friend request
// @access  Private
router.post(
  '/confirm',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { requesterID } = req.body;

    Friendship.findOneAndUpdate(
      { requester: requesterID, isConfirmed: false, accepter: req.user.id },
      { $set: { isConfirmed: true } },
      { new: true }
    )
      .then(res.json({ confirmSuccess: true }))
      .catch(err => console.log(err));
  }
);

// @route   POST api/friendships/decline
// @desc    Decline friend request
// @access  Private
router.post(
  '/decline',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { requesterID } = req.body;
    Friendship.findOneAndDelete({
      requester: requesterID,
      isConfirmed: false,
      accepter: req.user.id
    })
      .then(res.json({ declineSuccess: true }))
      .catch(err => console.log(err));
  }
);

module.exports = router;

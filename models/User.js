const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
  requested: {
    type: Array
  },
  pending: {
    type: Array
  },
  accepted: {
    type: Array
  }
});

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  tagname: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  birthdate: {
    type: String
  },
  friends: { FriendsSchema },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);

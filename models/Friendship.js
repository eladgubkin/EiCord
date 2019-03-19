const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendshipSchema = new Schema({
  requester: {
    type: String,
    required: true
  },
  accepter: {
    type: String,
    required: true
  },
  isConfirmed: {
    type: Boolean,
    default: false
  }
});

FriendshipSchema.index({ '$**': 'text' });

module.exports = Friendship = mongoose.model('friendships', FriendshipSchema);

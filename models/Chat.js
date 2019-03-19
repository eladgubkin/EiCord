const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: 'text'
  },
  message: {
    type: String,
    max: 2000
  }
});

ChatSchema.indexes({ '$**': 'text' });

module.exports = ChatSchema = mongoose.model('chats', ChatSchema);

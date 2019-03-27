const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  // sender: {
  //   type: String
  // },
  // messages: [
  //   {
  //     to: String,
  //     message: String,
  //     delivered: Boolean,
  //     read: Boolean,
  //     date: {
  //       type: Date,
  //       default: Date.now
  //     }
  //   }
  // ]
  from: String,
  to: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

MessageSchema.indexes({ '$**': 'text' });

module.exports = Message = mongoose.model('messages', MessageSchema);

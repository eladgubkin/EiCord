const io = require('./server').io;
const User = require('./models/User');
const Message = require('./models/Message');

module.exports = socket => {
  User.findByIdAndUpdate(
    { _id: socket.handshake.query['userID'] },
    { $set: { socketId: socket.id } },
    { new: true }
  )
    .then(user => null)
    .catch(err => console.log(err));

  socket.on('disconnect', () => {
    User.findByIdAndUpdate(
      { _id: socket.handshake.query['userID'] },
      { $set: { socketId: null } },
      { new: true }
    )
      .then(user => null)
      .catch(err => console.log(err));
  });

  socket.on('newMessage', data => {
    const newMessage = new Message({
      from: socket.handshake.query['userID'],
      to: data.friendID,
      message: data.message
    });

    newMessage
      .save()
      .then(() => {
        socket.emit('newMessage', newMessage);
        User.findById(data.friendID).then(friend => {
          io.to(friend.socketId).emit('newMessage', newMessage);
        });
      })
      .catch(err => console.log(err));
  });

  socket.on('getMessages', data => {
    Message.find({ from: socket.handshake.query['userID'], to: data.friendID }).then(
      messagesFromMe => {
        Message.find({
          from: data.friendID,
          to: socket.handshake.query['userID']
        }).then(messagesSentToMe => {
          socket.emit('ReceiveMessages', [...messagesFromMe, ...messagesSentToMe]);
        });
      }
    );
  });
};

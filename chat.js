const connection = io => {
  io.on('connection', socket => {
    console.log('Made Socket Connection!', socket.id);

    io.on('chat', data => {
      io.sockets.emit('chat', data);
    });
  });
};

export default connection;

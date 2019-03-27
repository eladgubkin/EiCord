const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const user = require('./routes/api/user');
const friendships = require('./routes/api/friendships');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use('/api/user', user);
app.use('/api/friendships', friendships);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Socket setup
const io = (module.exports.io = require('socket.io')(server));
const SocketManager = require('./SocketManager');
io.on('connection', SocketManager);

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const socketio = require('socket.io');

require('./config/passport.js')(passport);

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: 'auto',
    sameSite: 'strict'
  }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to DB.'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5555;

const srv = app.listen(port, () => console.log(`Server listening on port ${port}.`));

module.exports.io = socketio(srv);

app.use(express.static('public'));
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));
app.use('/chat', require('./routes/chat'));
const express = require('express');
const { checkAuth } = require('../config/auth');
const { io } = require('../server');

const router = express.Router();

let onlineUsers = {};

router.get('/', checkAuth, (req, res) => {
  res.render('chat', { nick: req.user.nick });
});

io.on('connection', (socket) => {
  socket.on('send-join', nickjoin => {
    onlineUsers[socket.id] = nickjoin;
    socket.broadcast.emit('join', nickjoin);
  });
  socket.on('send-msg', msg => {
    socket.broadcast.emit('msg', msg);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('leave', onlineUsers[socket.id]);
    delete onlineUsers[socket.id];
  });
});

module.exports = router;
const express = require('express');
const passport = require('passport');
const { checkNoAuth } = require('../config/auth');

const router = express.Router();

router.get('/', checkNoAuth, (req, res) => {
  res.render('login');
});

router.post('/', checkNoAuth, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/chat',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
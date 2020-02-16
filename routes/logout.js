const express = require('express');
const { checkAuth } = require('../config/auth');

const router = express.Router();

router.get('/', checkAuth, (req, res) => {
  req.logout();
  req.flash('success', 'You have been logged out.');
  res.redirect('/login');
});

module.exports = router;
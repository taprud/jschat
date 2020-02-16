const express = require('express');
const { checkNoAuth } = require('../config/auth');

const router = express.Router();

router.get('/', checkNoAuth, (req, res) => {
  res.render('index');
});

module.exports = router;

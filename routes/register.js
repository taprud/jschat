const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.js');
const { checkNoAuth } = require('../config/auth');

const router = express.Router();

router.get('/', checkNoAuth, (req, res) => {
  res.render('register');
});

router.post('/', checkNoAuth, (req, res) => {
  const { nick, pass, pass2 } = req.body;
  let errArr = [];

  if(!nick || !pass || !pass2)
    errArr.push({ err: 'Please fill all fields.'});

  if(pass !== pass2)
    errArr.push({ err: 'Passwords do not match.'});

  if(errArr.length > 0)
    res.render('register', {errArr, nick});
  else {
    User.findOne({ nick })
      .then(user => {
        if(user) {
          errArr.push({ err: 'Nickname already registered.'});
          res.render('register', {errArr, nick});
        }
        else {
          const newUser = new userModel({
            nick,
            pass
          });
    
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.pass, salt, (err, hash) => {
              if(err)
                throw err;

              newUser.pass = hash;

              newUser.save()
                .then(user => {
                  req.flash('success', 'You can now log in!');
                  res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
  }
});

module.exports = router;
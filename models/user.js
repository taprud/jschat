const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nick: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);

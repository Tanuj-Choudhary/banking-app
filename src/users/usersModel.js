// Third Party Imports
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'first name is required'],
  },

  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },

  currentBalance: {
    type: Number,
    default: 10000,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

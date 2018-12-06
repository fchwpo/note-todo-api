const mongoose = require('mongoose');

const UserCollection = mongoose.model('UserCollection', {
  email: {
    required: true,
    minlength: 1,
    type: String,
    trim: true,
  }
});

module.exports = {UserCollection};
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  email: {
    required: true,
    minlength: 1,
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '${VALUE} is not valid email'
    }
  },
  password: {
    required: true,
    minlength: 6,
    type: String
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ["_id","email"]);
}

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'v@Shubh@m').toString();
  user.tokens.push({
    access,
    token
  });
  return user.save().then((a) => {
    return token;
  })
}

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'v@Shubh@m');
  } catch(err) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
} 

const user = mongoose.model('user', UserSchema);

module.exports = {user};
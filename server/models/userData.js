const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
// The function written below is a Mongoose Middleware you can learn more about this in npm mongoose libraby search mongoose middleware
UserSchema.pre('save', function(next) {
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      if(err){
        next();
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err){
          next();
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const user = mongoose.model('user', UserSchema);

module.exports = {user};
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Box = mongoose.model('Box');
const { BOX_OPTIONS } = require('./boxes');

const userSchema  = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [{
      validator: value => validator.isEmail(value),
      msg: 'Invalid Email Address'
    }],
    required: 'Please supply an email'
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please supply a username'
  },
  hash: String,
  salt: String
});

// Ensures the user has a general box
userSchema.pre('save', async function(next) {
  const { username } = this;

  const preexistingBox = await Box.findOne({
    boxType: BOX_OPTIONS['general'],
    username
  });

  if (preexistingBox) {
    return;
  }

  const box = new Box({
    username,
    boxType: BOX_OPTIONS['general'],
    description: 'General box'
  });
  await box.save();

  return next();
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema);

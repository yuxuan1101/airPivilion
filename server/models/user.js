/**
 * Created by yuxuan on 9/2/16.
 */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const User = new mongoose.Schema({
  type: { type: String, default: 'User' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

User.pre('save',function (next) {
  console.log("resolve user save");
  const user = this;
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return reject(err) }
      resolve(salt)
    })
  }).then(salt => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { throw new Error(err) }
      user.password = hash
      next()
    })
  }).catch(err => next(err))
})

User.methods.validatePassword = function validatePassword (password) {
  const user = this

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) { return reject(err) }

      resolve(isMatch)
    })
  })
}

User.methods.generateToken = function generateToken () {
  const user = this

  return jwt.sign({ id: user.id }, config.token);
}

module.exports = mongoose.model('User', User);
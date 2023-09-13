const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type : String,
    required:[true, 'Please provide your username'],
    minLength: 3,
    maxLength: 25
  },
  email:{
    type:String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: 6,
  }
})

module.exports = mongoose.model('User', UserSchema)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide your username'],
    minLength: 3,
    maxLength: 25
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: 6,
  }
})

// Mongoose Middlewares
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

// Custom Mongoose Functions
UserSchema.methods.createJWT = function () {
  const token = jwt.sign({ id: this._id, username: this.username }, 
    process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
  return token;
}

UserSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema)
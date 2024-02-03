const { UnauthorizedError, BadRequestError } = require('../errors');
const User = require('../models/User');

const register = async (req, res, next) => {
  try {
    const user = await User({ ...req.body });
    await user.save();
    const { _id: id, username } = user;
    const token = user.createJWT();
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(201).json({ success: true, user: { id, username } });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || password.length < 6) {
      const err = new BadRequestError(
        'Please provide valide email and password!'
      );
      return next(err);
    }
    const user = await User.findOne({ email });
    if (!user) {
      const err = new UnauthorizedError('Invalid Credentials!');
      return next(err);
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      const err = new UnauthorizedError('Incorrect Password!');
      return next(err);
    }
    const { _id: id, username } = user;
    const token = user.createJWT();
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({ success: true, user: { id, username } });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const logout = (req, res) => {
  res.cookie(token, '', { maxAge: 0 });
  res.redirect('/login');
};

module.exports = {
  register,
  login,
  logout,
};

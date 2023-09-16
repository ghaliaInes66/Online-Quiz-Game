const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const secret = process.env.JWT_SECRET;
    const token = req.cookies['token'];
    if(!token) {
      return res.redirect('/');
    }
    const payload = jwt.verify(token, secret);
    const { id, username } = payload;
    req.user = { id, username };
    next();
  } catch (err) {
    console.error(err);
  }
}

module.exports = authMiddleware
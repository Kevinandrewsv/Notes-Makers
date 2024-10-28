const { validateToken } = require('../utils/tokenization');
const User = require('../models/userModel');
const authentication = async (req, res, next) => {


  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(404).json({
          message: 'Token data missing',
          status: 'error',
        });
      }
      const payload = validateToken(token);
      if (!payload || typeof payload === String) {
        return res
          .status(401)
          .json({ message: 'Login again', status: 'error' });
      }
      req.user = await User.findById(payload.id);
      next();
    } catch (error) {
      console.log(error, ' err-authCheckFunc');
      return res.status(500).json({ message: error.message, status: 'error' });
    }
  } else {
    return res
      .status(403)
      .json({ message: 'Auth header missing', status: 'error' });
  }
};

module.exports = { authentication };

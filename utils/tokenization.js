const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
module.exports = { generateToken, validateToken };

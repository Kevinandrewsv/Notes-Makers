const bcrypt = require('bcryptjs');

const encryptFunc = async (plaintextPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plaintextPassword, salt);
  return hashedPassword;
};
const decryptFunc = async (plaintextPassword, hashedPassword) => {
  const result = await bcrypt.compare(plaintextPassword, hashedPassword);
  return result ? true : false;
};
module.exports = { encryptFunc, decryptFunc };

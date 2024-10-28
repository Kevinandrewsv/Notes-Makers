const User = require('../models/userModel');
const { encryptFunc, decryptFunc } = require('../utils/hashFunction');
const { generateToken } = require('../utils/tokenization');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(403)
        .json({ message: 'Fields should not be empty', status: 'error' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(403).json({
        message: 'We already have an account with this email address',
        status: 'error',
      });
    }
    const newPassword = await encryptFunc(password);
    const user = await User.create({
      name,
      email,
      password: newPassword,
    });
    if (!user) {
      return res.status(403).json({
        message: 'Provide valid inputs',
        status: 'error',
      });
    }
    const payload = {
      name: user.name,
      email: user.email,
      id: user._id,
    };
    const token = generateToken(payload);
    res.status(200).json({
      data: {
        ...payload,
        token,
      },
      message: 'User created successfully',
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: `${error.message}--Problem in SignUp`,
      status: 'error',
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(403)
        .json({ message: 'Fields should not be empty', status: 'error' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'wrong credentials',
        status: 'error',
      });
    }
    const passwordCheck = await decryptFunc(password, user.password);

    if (!passwordCheck) {
      return res.status(401).json({
        message: 'wrong credentials',
        status: 'error',
      });
    }
    const payload = {
      name: user.name,
      email: user.email,
      id: user._id,
    };
    const token = generateToken(payload);
    res.status(200).json({
      data: {
        ...payload,
        token,
      },
      message: 'LoggedIn successfully',
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `${error.message}--Problem in logging in`,
      status: 'error',
    });
  }
};

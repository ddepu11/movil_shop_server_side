import { genSalt, hash, compare } from 'bcrypt';
import User from '../modals/User.js';
import generateAuthToken from '../utils/generateAuthToken.js';

// @desc   Handling User Log in
// @route  POST  /user/login
const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hasUserRegistered = await User.findOne({
      email,
    });

    if (hasUserRegistered) {
      const match = await compare(password, hasUserRegistered.password);

      const token = await generateAuthToken(hasUserRegistered._id);

      if (match && token) {
        // 1s = 1000ms
        // 1m = 60s
        // 1hr = 60m
        // 1d = 24hr
        // values in miliseconds
        res.cookie('jwt', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        });

        res.status(200).json({
          msg: `User login successfull!!!`,
        });
      } else {
        res.status(404).json({
          msg: `Wrong email password combination!!!`,
        });
      }
    } else {
      res.status(404).json({
        msg: `Wrong email password combination!!!`,
      });
    }
  } catch (err) {
    res.status(404).json({ msg: err.responce });
  }
};

// @desc   Handling User Sign Up
// @route  POST  /user/sign-up
const signUp = async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    // Find if email already exists
    const doesEmailAlreadyExists = await User.findOne({ email });

    // Find if email already exists
    const doesPNAlreadyExists = await User.findOne({
      phoneNumber,
    });

    // Runs When the user enters already existing credentials
    if (doesEmailAlreadyExists) {
      res.status(409).json({
        msg: 'This Email is already being used by someone else!!!',
      });
    } else if (doesPNAlreadyExists) {
      res.status(409).json({
        msg: 'This phone number is already being used by someone else!!!',
      });
    }

    // Runs When the user enters fresh credentials
    if (!doesEmailAlreadyExists && !doesPNAlreadyExists) {
      // Password hashing
      const salt = await genSalt(10);
      req.body.password = await hash(req.body.password, salt);

      const user = new User(req.body);
      await user.save();
      res.status(201).json({
        msg: 'User registration successfull!!!',
      });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// @desc  Sends account info
// @route GET /user/account
const getAccountInfo = (req, res) => {
  res.status(200).json({ ...req.userInfo });
};

// @desc  Logging user out
// @route GET /user/log-out
const logOut = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({ msg: 'User logged Out!!!' });
};

// @desc check is given  email registered?
// @route POST /user/is-email-registered
const isEmailRegistered = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = await generateAuthToken(user._id);
      res.cookie('jwt', token, {
        maxAge: new Date(Date.now() + 60 * 60 * 24 * 1000),
        httpOnly: true,
      });

      res.status(200).json({ user });
    } else {
      res.status(404).json({ user: 'User not found' });
    }
  } catch (error) {
    res.status(404).json({ msg: 'User not found' });
  }
};

export { logIn, signUp, getAccountInfo, logOut, isEmailRegistered };

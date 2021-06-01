import User from '../modals/User.js';
import { genSalt, hash, compare } from 'bcrypt';

// @desc   Handling User Log in
// @route  POST  /user/login
const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hasUserRegistered = await User.findOne({ email: email });

    if (hasUserRegistered) {
      const match = await compare(password, hasUserRegistered.password);

      const token = await hasUserRegistered.generateAuthToken();

      if (match) {
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
      res.status(404).json({ msg: `Wrong email password combination!!!` });
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
    const doesEmailAlreadyExists = await User.findOne({ email: email });

    // Find if email already exists
    const doesPNAlreadyExists = await User.findOne({
      phoneNumber: phoneNumber,
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
      res.status(201).json({ msg: 'User registration successfull!!!' });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getUserInfo = (req, res) => {};

export { logIn, signUp, getUserInfo };

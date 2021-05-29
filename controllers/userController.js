import User from '../modals/User.js';
import { genSalt, hash } from 'bcrypt';

// @desc   Handling User Log in
// @route  POST  /user/login
const logIn = (req, res) => {
  res.json({ msg: 'Log in request', data: req.body });
};

// @desc   Handling User Sign Up
// @route  POST  /user/sign-up
const signUp = async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    // Password hashing
    const salt = await genSalt(10);
    req.body.password = await hash(req.body.password, salt);

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
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ msg: 'User registration successfull' });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export { logIn, signUp };

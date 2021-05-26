import User from "../modals/User.js";
import { genSalt, hash } from "bcrypt";

// @desc   Handling User Log in
// @route  POST  /user/login
const logIn = (req, res) => {
  res.json({ msg: "Log in request", data: req.body });
};

// @desc   Handling User Sign Up
// @route  POST  /user/sign-up
const signUp = async (req, res) => {
  let { email, phoneNumber, password } = req.body;

  try {
    // Password hashing
    const salt = await genSalt(10);
    password = hash(password, salt);

    // Find if email already exists
    const doesEmailAlreadyExists = await User.findOne({ email: email });

    // Find if email already exists
    const doesPNAlreadyExists = await User.findOne({
      phoneNumber: phoneNumber,
    });

    // When the user enters already existing credentials
    if (doesEmailAlreadyExists) {
      res.status(409).json({
        msg: "This Email is already being used by someone else!!!",
      });
    } else if (doesPNAlreadyExists) {
      res.status(409).json({
        msg: "This phone number is already being used by someone else!!!",
      });
    }

    // When the user enters fresh credentials
    if (!doesEmailAlreadyExists && !doesPNAlreadyExists) {
      const user = new User(req.body);
      await user.save();
      res
        .status(201)
        .json({ redirect: "/", msg: "User registration successfull" });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export { logIn, signUp };

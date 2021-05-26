import User from "../modals/User.js";
import UserException from "../utils/userException.js";

// @desc   Handling User Log in
// @route  POST  /user/login
const logIn = (req, res) => {
  res.json({ msg: "Log in request", data: req.body });
};

// @desc   Handling User Sign Up
// @route  POST  /user/sign-up
const signUp = async (req, res) => {
  const { confirmPassword, email, firstName, lastName, password, phoneNumber } =
    req.body;

  try {
    const userWithThisEmailAlreadyExists = await User.findOne({ email: email });
    const userWithThisPhoneNumberAlreadyExists = await User.findOne({
      phoneNumber: phoneNumber,
    });

    if (userWithThisEmailAlreadyExists) {
      res.status(409).json({
        msg: "This Email is already being used!!",
      });
    } else if (userWithThisPhoneNumberAlreadyExists) {
      res.status(409).json({
        msg: "This phone number is already being used!!",
      });
    }

    if (
      !userWithThisEmailAlreadyExists &&
      !userWithThisPhoneNumberAlreadyExists
    ) {
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

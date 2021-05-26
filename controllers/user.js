import User from "../modals/User.js";

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
    const userEmail = await User.findOne({ email: email });
    const userPN = await User.findOne({ phoneNumber: phoneNumber });

    userPN &&
      res.status(500).json({
        msg: "This Email is already being used!!",
      });

    userPN &&
      res.status(500).json({
        msg: "This phone number is already being used!!",
      });

    if (!userPN && !userPN) {
      const user = new User(req.body);
      await user.save();
      res.json({ redirect: "/", msg: "User registration successfull" });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export { logIn, signUp };

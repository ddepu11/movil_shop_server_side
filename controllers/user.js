// @desc   Handling User Log in
// @route  POST  /user/login
const logIn = (req, res) => {
  res.json({ msg: "Log in request", data: req.body });
};

// @desc   Handling User Sign Up
// @route  POST  /user/sign-up
const signUp = (req, res) => {
  res.json({ msg: "Sign up request!!!", data: req.body });
};

export { logIn, signUp };

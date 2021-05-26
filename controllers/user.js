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
  } catch (err) {
    console.log(err.message);
  }

  res.json({
    msg: "Sign Up request",
    data: {
      confirmPassword,
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
    },
  });
};

export { logIn, signUp };

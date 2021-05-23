// @desc   Handling User Log in
// @route  POST  /user/login
const logIn = (req, res) => {
  res.json({ msg: "Log in request", data: req.body });
};

export { logIn };

const authenticateUser = async (req, res, next) => {
  const token = req.cookie;

  console.log(token);
  next();
};

export default authenticateUser;

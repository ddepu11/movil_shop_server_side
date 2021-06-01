import jwt from 'jsonwebtoken';
import User from '../modals/User.js';

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const { _id } = await jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findOne({ _id, 'tokens.token': token });

    if (user) {
      req.userInfo = user._doc;
      req.userId = _id;
    } else {
      throw new Error('User not found');
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Unautherized user!!!' });
  }
};

export default authenticateUser;

import jwt from 'jsonwebtoken';

const generateAuthToken = async (_id) => {
  try {
    const token = await jwt.sign({ _id }, process.env.TOKEN_SECRET);
    return token;
  } catch (error) {
    return false;
  }
};

export default generateAuthToken;

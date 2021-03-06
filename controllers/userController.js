import { genSalt, hash, compare } from 'bcrypt';
import User from '../modals/User.js';
import Mobile from '../modals/Mobile.js';
import generateAuthToken from '../utils/generateAuthToken.js';

const authUser = async (req, res) => {
  res.status(200).json({ user: req.userInfo });
};

// @desc   Handling User Log in
// @route  POST  /users/sign-in
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hasUserRegistered = await User.findOne({
      email,
    });

    if (hasUserRegistered) {
      const match = await compare(password, hasUserRegistered.password);

      const token = await generateAuthToken(hasUserRegistered._id);

      if (match && token) {
        // 1s = 1000ms
        // 1m = 60s
        // 1hr = 60m
        // 1d = 24hr
        // values are in miliseconds
        res.cookie('jwt', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
          secure: true,
          sameSite: 'none',
        });

        res.status(200).json({
          msg: `User sign in successfull!!!`,
          user: hasUserRegistered,
        });
      } else {
        res.status(404).json({
          msg: `Wrong email password combination!!!`,
        });
      }
    } else {
      res.status(404).json({
        msg: `Wrong email password combination!!!`,
      });
    }
  } catch (err) {
    res.status(404).json({ msg: err.response });
  }
};

// @desc   Handling User Sign Up
// @route  POST  /user/sign-up
const signUp = async (req, res) => {
  req.body.phoneNumber = +req.body.phoneNumber;

  const { email, phoneNumber } = req.body;

  try {
    // Find if email already exists
    const doesEmailAlreadyExists = await User.findOne({ email });

    // Find if email already exists
    const doesPNAlreadyExists = await User.findOne({
      phoneNumber,
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
      // Password hashing
      const salt = await genSalt(10);
      req.body.password = await hash(req.body.password, salt);

      const dpName = req.body.gender === 'male' ? 'maleDP.png' : 'femaleDP.png';

      const user = new User({
        ...req.body,
        displayPicture: {
          url: req.body.dp.url,
          fileName: req.body.dp.fileName ? req.body.dp.fileName : dpName,
        },
      });

      await user.save();

      res.status(201).json({
        msg: 'User registration successfull!!!',
      });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// @desc  Sends account info
// @route GET /user/account
const getAccountInfo = (req, res) => {
  res.status(200).json({ ...req.userInfo });
};

// @desc  Logging user out
// @route GET /user/log-out
const logOut = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1, secure: true, sameSite: 'none' });
  res.json({ msg: 'User logged Out!!!' });
};

// @desc check is given  email registered?
// @route POST /user/is-email-registered
const doesUserExists = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = await generateAuthToken(user._id);
      res.cookie('jwt', token, {
        maxAge: new Date(Date.now() + 60 * 60 * 24 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      res.status(200).json({ user });
    } else {
      res.status(404).json({ user: 'User not found' });
    }
  } catch (error) {
    res.status(404).json({ msg: 'User not found' });
  }
};

// @desc Update user information
// @route POST /user/:id
const updateUserInfo = async (req, res) => {
  const userID = req.params.id;

  try {
    const { email, phoneNumber } = req.body;

    const doesEmailAlreadyExists = await User.findOne({ email });

    const doesPhoneNumberAlreadyExists = await User.findOne({ phoneNumber });

    if (doesEmailAlreadyExists) {
      res
        .status(409)
        .json({ msg: 'This Email is already being used by someone else!!!' });
    } else if (doesPhoneNumberAlreadyExists) {
      res.status(409).json({
        msg: 'This phone number is already being used by someone else!!!',
      });
    } else {
      const oldPWD = req.userInfo.password.trim();
      const newPWD = req.body.password.trim();

      if (oldPWD === newPWD) {
        // When password is same
        const updatedUser = await User.findByIdAndUpdate(
          { _id: userID },
          req.body,
          { new: true }
        );

        res.json({ user: updatedUser });
      } else {
        // When Password is changed we need to hash it
        const salt = await genSalt(10);
        req.body.password = await hash(newPWD, salt);

        const updatedUser = await User.findByIdAndUpdate(
          { _id: userID },
          req.body,
          { new: true }
        );

        res.json({ user: updatedUser });
      }
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// @desc Change user pic
// @route POST /user/change-dp
const changeDisplayPicture = async (req, res) => {
  const { id } = req.params;

  try {
    const { url, fileName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { displayPicture: { url, fileName } },
      { new: true }
    );

    res.status(200).json({ updatedUser });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const addMobileToCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { cart: { ...req.body } } },
      { new: true }
    );

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ msg: 'Could not add to the cart>' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const increaseOrDecreaseCartItemQuantity = async (req, res) => {
  const { userId, cartItemId } = req.params;
  const { action } = req.body;

  try {
    let user;
    if (action === 'INC') {
      user = await User.findOneAndUpdate(
        { _id: userId },

        { $inc: { 'cart.$[elem].quantity': +1 } },

        { new: true, arrayFilters: [{ 'elem._id': cartItemId }] }
      );
    } else {
      user = await User.findOneAndUpdate(
        { _id: userId },

        { $inc: { 'cart.$[elem].quantity': -1 } },

        { new: true, arrayFilters: [{ 'elem._id': cartItemId }] }
      );
    }

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ msg: 'Could not increase quantity!' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const removeUserCartItem = async (req, res) => {
  const { userId, cartItemId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { mobileId: cartItemId } } },
      { new: true }
    );

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ msg: 'Could not Delete the cart item!' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const removeAllCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { cart: [] } },
      { new: true }
    );

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ msg: 'Could not clear your cart!' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const saveDeliveryAddress = async (req, res) => {
  const { userId } = req.params;

  const deliveryAddress = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { deliveryAddress: { ...deliveryAddress } } },
      { new: true }
    );

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ msg: 'Could Not Save address' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const saveOrders = async (req, res) => {
  const { userId } = req.params;

  const { cart } = req.body;

  cart.map((i) => {
    const m = i;
    delete m._id;
    delete m.quantity;
    return m;
  });

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { orders: [...cart] } },
      { new: true }
    );

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ msg: 'Could not save orders!' });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'USER' }, '-password -role');

    if (users) {
      res.status(200).json({ users });
    } else {
      res.status(404).json({ msg: 'Could not find users!' });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const listSeller = async (req, res) => {
  try {
    const sellers = await User.find(
      { role: 'SELLER' },
      '-password -role -cart -orders'
    );

    if (sellers) {
      res.status(200).json({ sellers });
    } else {
      res.status(404).json({ msg: 'Could not find sellers!' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id: userId, role: 'USER' });

    if (user) {
      res.status(200).json({ mgs: 'Successfully deleted users data!' });
    } else {
      res.status(409).json({ mgs: 'Could not delete user!' });
    }
  } catch (err) {
    res.status(409).json({ mgs: err.message });
  }
};

const deleteSeller = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id: userId, role: 'SELLER' });

    if (user) {
      await Mobile.deleteMany({ 'sellerInfo.id': userId });

      res.status(200).json({ mgs: 'Successfully deleted seller!' });
    } else {
      res.status(409).json({ mgs: 'Could not delete seller!' });
    }
  } catch (err) {
    res.status(409).json({ mgs: err.message });
  }
};

export {
  signIn,
  signUp,
  getAccountInfo,
  logOut,
  doesUserExists,
  authUser,
  updateUserInfo,
  changeDisplayPicture,
  addMobileToCart,
  increaseOrDecreaseCartItemQuantity,
  removeUserCartItem,
  removeAllCartItems,
  saveDeliveryAddress,
  saveOrders,
  listUsers,
  listSeller,
  deleteUser,
  deleteSeller,
};

import {
  USER_INFO_BEGIN,
  USER_INFO_SUCCESS,
  USER_INFO_ERROR,
  USER_CLEAR_SIGNUP_STATUS,
  USER_REGISTER_CHECK_BEGIN,
  USER_REGISTER_CHECK_SUCCESS,
  USER_REGISTER_CHECK_ERROR,
  USER_SIGN_IN_BEGIN,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_ERROR,
  USER_LOG_OUT_BEGIN,
  USER_LOG_OUT_ERROR,
  USER_LOG_OUT_SUCCESS,
  USER_SIGN_UP_BEGIN,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP_SUCCESS,
  USER_AUTHENTICATION_SUCCESS,
  USER_AUTHENTICATION_FAIL,
  USER_UPDATE_BEGIN,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_CHANGE_DP_BEGIN,
  USER_CHANGE_DP_ERROR,
  USER_CHANGE_DP_SUCCESS,
  USER_CART_ADD_MOBILE_BEGIN,
  USER_CART_ADD_MOBILE_ERROR,
  USER_CART_ADD_MOBILE_SUCCESS,
  USER_CART_ITEM_INC_DEC_QUANTITY_BEGIN,
  USER_CART_ITEM_INC_DEC_QUANTITY_ERROR,
  USER_CART_ITEM_INC_DEC_QUANTITY_SUCCESS,
  USER_CART_ITEM_DELETE_BEGIN,
  USER_CART_ITEM_DELETE_ERROR,
  USER_CART_ITEM_DELETE_SUCCESS,
  USER_CART_REMOVE_ALL_BEGIN,
  USER_CART_REMOVE_ALL_ERROR,
  USER_CART_REMOVE_ALL_SUCCESS,
  USER_DELIVERY_ADDRESS_SAVE_BEGIN,
  USER_DELIVERY_ADDRESS_SAVE_ERROR,
  USER_DELIVERY_ADDRESS_SAVE_SUCCESS,
  USER_ORDERS_SAVE_BEGIN,
  USER_ORDERS_SAVE_ERROR,
  USER_ORDERS_SAVE_SUCCESS,
} from '../constants/userConstants';

import * as user from '../api/userApi';
import { sendNotification } from './notificationActions';
import { clearSellerState } from './sellerActions';

// Authenticate User
const authenticateUser = () => async (dispatch) => {
  try {
    const { data } = await user.authenticate();

    const { firstName, lastName, role, _id } = data.user;

    dispatch({
      type: USER_AUTHENTICATION_SUCCESS,
      payload: { role, id: _id, user: data.user },
    });

    dispatch(
      sendNotification(`Welcome back ${firstName} ${lastName} :)`, false)
    );
  } catch (err) {
    dispatch({ type: USER_AUTHENTICATION_FAIL });
  }
};

//  check if given email is registered while loggijng in using google??
const isUserRegisteredWithThisEmail = (email) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_CHECK_BEGIN });

  try {
    const { data } = await user.checkIsEmailRegistered(email);

    dispatch({
      type: USER_REGISTER_CHECK_SUCCESS,
      payload: data.user,
    });
    dispatch(sendNotification('User Logged In Successfully!!!', false));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_CHECK_ERROR,
      payload: 'User was not registered!!!',
    });
    dispatch(sendNotification('User was not registered!!!', true));
  }
};

// Custom User Login
const customUserSignIn = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGN_IN_BEGIN });

  try {
    const { data } = await user.logIn(email, password);

    // Handle this
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data.user });
    dispatch(sendNotification(data.msg, false));
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({ type: USER_SIGN_IN_ERROR });
    dispatch(sendNotification(msg, true));
  }
};

// Sign Up Action
const signUpUser = (userCredentials) => async (dispatch) => {
  dispatch({ type: USER_SIGN_UP_BEGIN });

  try {
    const { data } = await user.signUp(userCredentials);

    if (data) {
      dispatch({
        type: USER_SIGN_UP_SUCCESS,
      });

      dispatch(sendNotification(data.msg, false));
    }
  } catch (err) {
    const { msg } = err.response.data;

    dispatch({ type: USER_SIGN_UP_ERROR, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

// assigns false to hasUseSignedUp flag
const clearUserSignUpSuccess = () => (dispatch) => {
  dispatch({ type: USER_CLEAR_SIGNUP_STATUS });
};

const getAccountInfo = () => async (dispatch) => {
  dispatch({ type: USER_INFO_BEGIN });

  try {
    const { data } = await user.accountInfo();

    dispatch({ type: USER_INFO_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: USER_INFO_ERROR });

    dispatch(
      sendNotification('You have no permission to access that page!!!', true)
    );
  }
};

const logOutUser = () => async (dispatch) => {
  dispatch({ type: USER_LOG_OUT_BEGIN });

  try {
    await user.logOut();

    dispatch({
      type: USER_LOG_OUT_SUCCESS,
    });

    dispatch(sendNotification('User logged out successfully!!!', false));

    dispatch(clearSellerState());
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({ type: USER_LOG_OUT_ERROR, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

const updateUser = (userInfo, _id) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_BEGIN });

  try {
    const { data } = await user.update(userInfo, _id);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data.user,
    });

    dispatch(sendNotification('User updated Successfully!!!', false));
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({ type: USER_UPDATE_ERROR, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

const changeDisplayPicture = (formData, _id) => async (dispatch) => {
  dispatch({ type: USER_CHANGE_DP_BEGIN });

  try {
    const {
      data: { updatedUser },
    } = await user.changeDP(formData, _id);

    dispatch({
      type: USER_CHANGE_DP_SUCCESS,
      payload: updatedUser,
    });

    dispatch(
      sendNotification('You have successfully changed your dp!!!', false)
    );
  } catch (err) {
    const msg = err.message.response;
    dispatch({ type: USER_CHANGE_DP_ERROR, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

const addMobileToCart = (userId, mobileInfo) => async (dispatch) => {
  dispatch({ type: USER_CART_ADD_MOBILE_BEGIN });

  try {
    const res = await user.addToCart(userId, mobileInfo);

    if (res) {
      dispatch({
        type: USER_CART_ADD_MOBILE_SUCCESS,
        payload: res.data.user,
      });

      dispatch(sendNotification('Successfully added to cart!', false));
    } else {
      dispatch({ type: USER_CART_ADD_MOBILE_ERROR });

      dispatch(sendNotification('Could not add to cart!', true));
    }
  } catch (err) {
    const { msg } = err.response.data;

    dispatch({ type: USER_CART_ADD_MOBILE_ERROR });

    dispatch(sendNotification(msg, true));
  }
};

const increaseOrDecreaseCartItemQuantity =
  (userId, cartItemId, action) => async (dispatch) => {
    dispatch({ type: USER_CART_ITEM_INC_DEC_QUANTITY_BEGIN });

    try {
      const res = await user.increaseOrDecreaseCartItemQuantity(
        userId,
        cartItemId,
        action
      );

      if (res) {
        dispatch({
          type: USER_CART_ITEM_INC_DEC_QUANTITY_SUCCESS,
          payload: res.data.user,
        });

        dispatch(sendNotification('Increased the quantity!', false));
      } else {
        dispatch({ type: USER_CART_ITEM_INC_DEC_QUANTITY_ERROR });

        dispatch(sendNotification('Could not increase the quantity!', true));
      }
    } catch (err) {
      const { msg } = err.response.data;
      dispatch({ type: USER_CART_ITEM_INC_DEC_QUANTITY_ERROR });

      dispatch(sendNotification(msg, true));
    }
  };

const deleteCartItem = (userId, cartItemId) => async (dispatch) => {
  dispatch({ type: USER_CART_ITEM_DELETE_BEGIN });

  try {
    const res = await user.deleteCartItem(userId, cartItemId);

    if (res) {
      dispatch({ type: USER_CART_ITEM_DELETE_SUCCESS, payload: res.data.user });
      dispatch(sendNotification('Successfully deleted the cart item!', false));
    } else {
      dispatch({ type: USER_CART_ITEM_DELETE_ERROR });
      dispatch(sendNotification('Could not delete cart item!', true));
    }
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({ type: USER_CART_ITEM_DELETE_ERROR });
    dispatch(sendNotification(msg, true));
  }
};

const emptyUserCart = (userId) => async (dispatch) => {
  dispatch({ type: USER_CART_REMOVE_ALL_BEGIN });

  try {
    const res = await user.removeAllCartItems(userId);

    if (res) {
      dispatch({ type: USER_CART_REMOVE_ALL_SUCCESS, payload: res.data.user });
    } else {
      dispatch({ type: USER_CART_REMOVE_ALL_ERROR });
    }
  } catch (err) {
    const { msg } = err.response.data;

    dispatch(sendNotification(msg, true));

    dispatch({ type: USER_CART_REMOVE_ALL_ERROR });
  }
};

const saveUserDeliveryAddress =
  (userId, deliveryAddress) => async (dispatch) => {
    dispatch({ type: USER_DELIVERY_ADDRESS_SAVE_BEGIN });

    try {
      const res = await user.saveDeliveryAddress(userId, deliveryAddress);

      if (res) {
        dispatch(
          sendNotification('Successfuly saved delivery Address!', false)
        );

        dispatch({
          type: USER_DELIVERY_ADDRESS_SAVE_SUCCESS,
          payload: res.data.user,
        });
      } else {
        dispatch(sendNotification('Could not save delivery Address!', true));

        dispatch({ type: USER_DELIVERY_ADDRESS_SAVE_ERROR });
      }
    } catch (err) {
      const { msg } = err.response.data;

      dispatch(sendNotification(msg, true));

      dispatch({ type: USER_DELIVERY_ADDRESS_SAVE_ERROR });
    }
  };

const saveUserOrders = (userId, cart) => async (dispatch) => {
  dispatch({ type: USER_ORDERS_SAVE_BEGIN });

  try {
    const res = await user.saveUserOrders(userId, cart);

    if (res) {
      dispatch({ type: USER_ORDERS_SAVE_SUCCESS, payload: res.data.user });
    } else {
      dispatch({ type: USER_ORDERS_SAVE_ERROR });
    }
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({ type: USER_ORDERS_SAVE_ERROR });
    dispatch(sendNotification(msg, true));
  }
};

export {
  customUserSignIn,
  signUpUser,
  clearUserSignUpSuccess,
  getAccountInfo,
  logOutUser,
  isUserRegisteredWithThisEmail,
  authenticateUser,
  updateUser,
  changeDisplayPicture,
  addMobileToCart,
  increaseOrDecreaseCartItemQuantity,
  deleteCartItem,
  emptyUserCart,
  saveUserDeliveryAddress,
  saveUserOrders,
};

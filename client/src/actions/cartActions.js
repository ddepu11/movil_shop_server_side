import {
  CART_ADD_MOBILE_TO_LOCAL_BEGIN,
  CART_ADD_MOBILE_TO_LOCAL_SUCCESS,
  CART_ADD_MOBILE_TO_LOCAL_ERROR,
  CART_INC_DEC_QUANTITY_BEGIN,
  CART_INC_DEC_QUANTITY_SUCCESS,
  CART_REMOVE_ITEM_BEGIN,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEMS_SUCCESS,
} from '../constants/cartConstants';

import { sendNotification } from './notificationActions';
import { getLocalCart, setLocalCart } from '../utils/getLocalCart';

export const addMobileToLocalStorageCart = (cartItemInfo) => (dispatch) => {
  dispatch({ type: CART_ADD_MOBILE_TO_LOCAL_BEGIN });

  if (!getLocalCart()) {
    setLocalCart([cartItemInfo]);

    dispatch({
      type: CART_ADD_MOBILE_TO_LOCAL_SUCCESS,
      payload: getLocalCart(),
    });
  } else {
    const cart = getLocalCart();

    let flag = false;

    cart.forEach((m) => {
      if (m.mobileId === cartItemInfo.mobileId) flag = true;
    });

    if (flag) {
      dispatch(sendNotification('Already Added in cart!', false));

      dispatch({ type: CART_ADD_MOBILE_TO_LOCAL_ERROR, payload: cart });
    } else {
      cart.push(cartItemInfo);

      setLocalCart(cart);

      dispatch({ type: CART_ADD_MOBILE_TO_LOCAL_SUCCESS, payload: cart });
    }
  }
};

export const incDecQuantity = (mobileId, action) => (dispatch) => {
  dispatch({ type: CART_INC_DEC_QUANTITY_BEGIN });

  let cart = getLocalCart();

  cart = cart.map((m) => {
    if (m.mobileId === mobileId && action === 'INC') {
      return { ...m, quantity: m.quantity + 1 };
    }

    if (m.mobileId === mobileId && action === 'DEC')
      return { ...m, quantity: m.quantity - 1 };

    return m;
  });

  setLocalCart(cart);

  dispatch({ type: CART_INC_DEC_QUANTITY_SUCCESS, payload: cart });
};

export const removeCartItem = (mobileId) => (dispatch) => {
  dispatch({ type: CART_REMOVE_ITEM_BEGIN });

  let cart = getLocalCart();

  cart = cart.filter((m) => m.mobileId !== mobileId);

  setLocalCart(cart);

  dispatch({ type: CART_REMOVE_ITEM_SUCCESS, payload: cart });
};

export const removeAllLocalCartItems = () => (dispatch) => {
  setLocalCart([]);
  dispatch({ type: CART_REMOVE_ITEMS_SUCCESS });
};

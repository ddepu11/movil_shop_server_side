import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { incDecQuantity, removeCartItem } from '../../../actions/cartActions';

import {
  addMobileToCart,
  deleteCartItem,
  increaseOrDecreaseCartItemQuantity,
} from '../../../actions/userActions';

const CartScreenLogic = () => {
  const { localStorageCart, cartLoading } = useSelector((state) => state.cart);

  const { hasUserLoggedIn, userInfo, userLoading } = useSelector(
    (state) => state.user
  );

  const isUserInfoEmpty = Object.keys(userInfo).length === 0;

  const formatePrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);

  const dispatch = useDispatch();

  const handleQuantity = (cartItemId, action) => {
    dispatch(
      increaseOrDecreaseCartItemQuantity(userInfo._id, cartItemId, action)
    );
  };

  const handleLocalCartQuantity = (cartItemId, action) => {
    dispatch(incDecQuantity(cartItemId, action));
  };

  useEffect(() => {
    // get cart item which is not in db cart
    if (!isUserInfoEmpty && localStorageCart.length !== 0) {
      const comparer = (otherArray) => (current) =>
        otherArray.filter((other) => other.mobileId === current.mobileId)
          .length === 0;

      const arr = localStorageCart.filter(comparer(userInfo.cart));

      // if there is any then save it to db cart
      if (arr.length !== 0) {
        arr.forEach((e) => dispatch(addMobileToCart(userInfo._id, e)));
      }
    }
  }, [
    isUserInfoEmpty,
    userInfo.cart,
    localStorageCart,
    userInfo._id,
    dispatch,
  ]);

  return {
    handleLocalCartQuantity,
    handleQuantity,
    formatePrice,
    hasUserLoggedIn,
    userLoading,
    cartLoading,
    removeCartItem,
    deleteCartItem,
    userInfo,
    dispatch,
    localStorageCart,
    isUserInfoEmpty,
  };
};

export default CartScreenLogic;

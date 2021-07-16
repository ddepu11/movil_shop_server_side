import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  calculateOrderTotal,
  setDefaultOrderTotal,
} from '../../../actions/orderTotalActions';

const CartPriceDetailsLogic = () => {
  const { localStorageCart } = useSelector((state) => state.cart);

  const { userInfo, hasUserLoggedIn } = useSelector((state) => state.user);

  const { totalPrice, totalItems, discount } = useSelector(
    (state) => state.orderTotal
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorageCart.length) {
      dispatch(calculateOrderTotal(localStorageCart));
    }

    if (Object.keys(userInfo).length !== 0 && hasUserLoggedIn) {
      dispatch(calculateOrderTotal(userInfo.cart));
    }

    !localStorageCart.length &&
      Object.keys(userInfo).length === 0 &&
      dispatch(setDefaultOrderTotal());
  }, [localStorageCart, userInfo, hasUserLoggedIn, dispatch]);

  return {
    totalPrice,
    totalItems,
    discount,
  };
};

export default CartPriceDetailsLogic;

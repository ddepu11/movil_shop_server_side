import {
  ORDER_CALCULATE_TOTAL_SUCCESS,
  ORDER_TOTAL_SET_DEFAULT_VALUE,
} from '../constants/orderTotalConstants';

export const calculateOrderTotal = (cart) => (dispatch) => {
  const totals = cart.reduce(
    (total, currVal) => {
      const { quantity, price } = currVal;

      return {
        totalPrice: total.totalPrice + quantity * price,
        totalItems: quantity + total.totalItems,
        discount: Math.floor(Math.random() * 1000),
      };
    },
    { totalPrice: 0, totalItems: 0, discount: 0 }
  );

  dispatch({ type: ORDER_CALCULATE_TOTAL_SUCCESS, payload: totals });
};

export const setDefaultOrderTotal = () => (dispatch) => {
  dispatch({ type: ORDER_TOTAL_SET_DEFAULT_VALUE });
};

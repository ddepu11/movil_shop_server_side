import {
  ORDER_CALCULATE_TOTAL_SUCCESS,
  ORDER_TOTAL_SET_DEFAULT_VALUE,
} from '../constants/orderTotalConstants';

const initialState = {
  totalPrice: 0,
  totalItems: 0,
  discount: 0,
};

const orderTotal = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CALCULATE_TOTAL_SUCCESS:
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
        totalItems: action.payload.totalItems,
        discount: action.payload.discount,
      };

    case ORDER_TOTAL_SET_DEFAULT_VALUE:
      return {
        ...state,
        totalPrice: 0,
        totalItems: 0,
        discount: 0,
      };

    default:
      return {
        ...state,
      };
  }
};

export default orderTotal;

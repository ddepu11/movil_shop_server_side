import {
  PAYMENT_CLEAR_STATE,
  PAYMENT_MAKE_BEGIN,
  PAYMENT_MAKE_ERROR,
  PAYMENT_MAKE_SUCCESS,
  PAYMENT_RAZORPAY_CREATE_AN_ORDER_BEGIN,
  PAYMENT_RAZORPAY_CREATE_AN_ORDER_ERROR,
  PAYMENT_RAZORPAY_CREATE_AN_ORDER_SUCCESS,
} from '../constants/paymentConstants';

const initialState = {
  paymentLoading: false,
  paymentError: false,
  paymentSuccess: false,
};

const payment = (state = initialState, action) => {
  switch (action.type) {
    // Create an order
    case PAYMENT_RAZORPAY_CREATE_AN_ORDER_BEGIN:
      return {
        ...state,
        paymentLoading: true,
      };

    case PAYMENT_RAZORPAY_CREATE_AN_ORDER_SUCCESS:
      return {
        ...state,
        paymentLoading: false,
        paymentError: false,
      };

    case PAYMENT_RAZORPAY_CREATE_AN_ORDER_ERROR:
      return {
        ...state,
        paymentLoading: false,
        paymentError: true,
      };

    // Make Payment
    case PAYMENT_MAKE_BEGIN:
      return {
        ...state,
      };

    case PAYMENT_MAKE_SUCCESS:
      return {
        ...state,
        paymentLoading: false,
        paymentError: false,
        paymentSuccess: true,
      };

    case PAYMENT_MAKE_ERROR:
      return {
        ...state,
        paymentLoading: false,
        paymentError: true,
      };

    case PAYMENT_CLEAR_STATE:
      return {
        ...state,
        paymentLoading: false,
        paymentError: false,
        paymentSuccess: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default payment;

import {
  CART_ADD_MOBILE_TO_LOCAL_BEGIN,
  CART_ADD_MOBILE_TO_LOCAL_ERROR,
  CART_ADD_MOBILE_TO_LOCAL_SUCCESS,
  CART_INC_DEC_QUANTITY_BEGIN,
  CART_INC_DEC_QUANTITY_SUCCESS,
  CART_REMOVE_ITEMS_SUCCESS,
  CART_REMOVE_ITEM_BEGIN,
  CART_REMOVE_ITEM_SUCCESS,
} from '../constants/cartConstants';
import { getLocalCart } from '../utils/getLocalCart';

const initiateState = {
  localStorageCart: [],
  cartLoading: false,
  orderId: '',
};

const localsCartcart = getLocalCart();

if (localsCartcart) initiateState.localStorageCart = localsCartcart;

const cart = (state = initiateState, action) => {
  switch (action.type) {
    // Add Cart To Local Storage
    case CART_ADD_MOBILE_TO_LOCAL_BEGIN:
      return {
        ...state,
        cartLoading: true,
      };

    case CART_ADD_MOBILE_TO_LOCAL_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        localStorageCart: action.payload,
      };

    case CART_ADD_MOBILE_TO_LOCAL_ERROR:
      return {
        ...state,
        cartLoading: false,
        localStorageCart: action.payload,
      };

    // Increase Quantity
    case CART_INC_DEC_QUANTITY_BEGIN:
      return {
        ...state,
        cartLoading: true,
      };

    case CART_INC_DEC_QUANTITY_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        localStorageCart: action.payload,
      };

    // Remove Item
    case CART_REMOVE_ITEM_BEGIN:
      return {
        ...state,
        cartLoading: true,
      };

    case CART_REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        localStorageCart: action.payload,
      };

    // Remove All Items
    case CART_REMOVE_ITEMS_SUCCESS:
      return {
        ...state,
        localStorageCart: [],
      };

    default:
      return {
        ...state,
      };
  }
};

export default cart;

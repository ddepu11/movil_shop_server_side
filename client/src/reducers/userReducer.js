import {
  USER_INFO_BEGIN,
  USER_INFO_ERROR,
  USER_INFO_SUCCESS,
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
  USER_CART_ITEM_INC_DEC_QUANTITY_ERROR,
  USER_CART_ITEM_INC_DEC_QUANTITY_BEGIN,
  USER_CART_ITEM_INC_DEC_QUANTITY_SUCCESS,
  USER_CART_ITEM_DELETE_BEGIN,
  USER_CART_ITEM_DELETE_ERROR,
  USER_CART_ITEM_DELETE_SUCCESS,
  USER_CART_REMOVE_ALL_BEGIN,
  USER_CART_REMOVE_ALL_SUCCESS,
  USER_CART_REMOVE_ALL_ERROR,
  USER_DELIVERY_ADDRESS_SAVE_BEGIN,
  USER_DELIVERY_ADDRESS_SAVE_ERROR,
  USER_DELIVERY_ADDRESS_SAVE_SUCCESS,
  USER_ORDERS_SAVE_BEGIN,
  USER_ORDERS_SAVE_ERROR,
  USER_ORDERS_SAVE_SUCCESS,
} from '../constants/userConstants';

const initialUser = {
  userInfo: {},
  hasUserLoggedIn: false,
  userLoading: false,
  hasUserError: false,
  userSignUpSuccess: false,
  role: '',
};

const user = (userState = initialUser, action) => {
  switch (action.type) {
    case USER_AUTHENTICATION_SUCCESS:
      return {
        ...userState,
        hasUserLoggedIn: true,
        role: action.payload.role,
        id: action.payload.id,
        userInfo: action.payload.user,
        hasUserError: false,
      };

    case USER_AUTHENTICATION_FAIL:
      return {
        ...userState,
        hasUserLoggedIn: false,
        hasUserError: true,
      };

    case USER_REGISTER_CHECK_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_REGISTER_CHECK_SUCCESS:
      return {
        ...userState,
        hasUserLoggedIn: true,
        userInfo: action.payload,
        userLoading: false,
        hasUserError: false,
      };

    case USER_REGISTER_CHECK_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };

    // Sign-in State handling
    case USER_SIGN_IN_BEGIN:
      return {
        ...userState,
        userLoading: true,
        hasUserError: false,
      };

    case USER_SIGN_IN_SUCCESS:
      return {
        ...userState,
        hasUserLoggedIn: true,
        userLoading: false,
        hasUserError: false,
        role: action.payload.role,
        id: action.payload._id,
      };

    case USER_SIGN_IN_ERROR:
      return {
        ...userState,
        hasUserError: true,
        userLoading: false,
      };

    // Sign-Up State handling
    case USER_SIGN_UP_BEGIN:
      return {
        ...userState,
        userLoading: true,
        hasUserError: false,
      };

    case USER_SIGN_UP_SUCCESS:
      return {
        ...userState,
        userSignUpSuccess: true,
        userLoading: false,
        hasUserError: false,
      };

    case USER_SIGN_UP_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };

    case USER_CLEAR_SIGNUP_STATUS:
      return {
        ...userState,
        userSignUpSuccess: false,
        hasUserError: false,
      };

    case USER_INFO_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_INFO_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        hasUserLoggedIn: true,
        hasUserError: false,
        userInfo: action.payload,
      };

    case USER_INFO_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };

    // Log out
    case USER_LOG_OUT_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_LOG_OUT_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        hasUserLoggedIn: false,
        userInfo: {},
        hasUserError: false,
        role: '',
        id: '',
      };

    case USER_LOG_OUT_ERROR:
      return {
        ...userState,
        hasUserError: true,
        userLoading: false,
      };

    // User info updated
    case USER_UPDATE_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_UPDATE_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        userInfo: action.payload,
        hasUserError: false,
      };

    case USER_UPDATE_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };

    // Changing DP
    case USER_CHANGE_DP_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_CHANGE_DP_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        userInfo: action.payload,
        hasUserError: false,
      };

    case USER_CHANGE_DP_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };

    // Add Item To Cart
    case USER_CART_ADD_MOBILE_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_CART_ADD_MOBILE_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        userInfo: action.payload,
      };

    case USER_CART_ADD_MOBILE_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };

    // Increase Cart's item quantity
    case USER_CART_ITEM_INC_DEC_QUANTITY_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_CART_ITEM_INC_DEC_QUANTITY_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        userInfo: action.payload,
      };

    case USER_CART_ITEM_INC_DEC_QUANTITY_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };

    // Remove Cart Item
    case USER_CART_ITEM_DELETE_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_CART_ITEM_DELETE_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        userInfo: action.payload,
      };

    case USER_CART_ITEM_DELETE_ERROR:
      return {
        ...userState,
        userLoading: false,
      };

    // Remove all items
    case USER_CART_REMOVE_ALL_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_CART_REMOVE_ALL_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        userInfo: action.payload,
      };

    case USER_CART_REMOVE_ALL_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };

    // Save delivery Address
    case USER_DELIVERY_ADDRESS_SAVE_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_DELIVERY_ADDRESS_SAVE_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        userInfo: action.payload,
      };

    case USER_DELIVERY_ADDRESS_SAVE_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };

    // Save orders
    case USER_ORDERS_SAVE_BEGIN:
      return {
        ...userState,
        userLoading: true,
      };

    case USER_ORDERS_SAVE_SUCCESS:
      return {
        ...userState,
        userLoading: false,
        userInfo: action.payload,
      };

    case USER_ORDERS_SAVE_ERROR:
      return {
        ...userState,
        userLoading: false,
        hasUserError: true,
      };
    default:
      return userState;
  }
};

export default user;

import {
  SELLER_CLEAR_STATE,
  SELLER_MOBILE_DELETE_BEGIN,
  SELLER_MOBILE_DELETE_ERROR,
  SELLER_MOBILE_DELETE_SUCCESS,
  SELLER_MOBILE_LIST_BEGIN,
  SELLER_MOBILE_LIST_ERROR,
  SELLER_MOBILE_LIST_SUCCESS,
  SELLER_MOBILE_UPDATE_BEGIN,
  SELLER_MOBILE_UPDATE_ERROR,
  SELLER_MOBILE_UPDATE_SUCCESS,
} from '../constants/sellerConstants';

const initialState = {
  sellerMobiles: [],
  sellerLoading: false,
  sellerError: false,
};

const seller = (sellerState = initialState, action) => {
  switch (action.type) {
    case SELLER_MOBILE_LIST_BEGIN:
      return {
        ...sellerState,
        sellerLoading: true,
      };

    case SELLER_MOBILE_LIST_SUCCESS:
      return {
        ...sellerState,
        sellerLoading: false,
        sellerMobiles: action.payload,
      };

    case SELLER_MOBILE_LIST_ERROR:
      return {
        ...sellerState,
        sellerLoading: false,
        sellerError: true,
      };
    case SELLER_MOBILE_DELETE_BEGIN:
      return {
        ...sellerState,
        sellerLoading: true,
      };

    case SELLER_MOBILE_DELETE_SUCCESS:
      return {
        ...sellerState,
        sellerMobiles: sellerState.sellerMobiles.filter(
          (m) => m._id !== action.payload
        ),
        sellerLoading: false,
      };

    case SELLER_MOBILE_DELETE_ERROR:
      return {
        ...sellerState,
        sellerLoading: false,
        sellerError: true,
      };

    case SELLER_MOBILE_UPDATE_BEGIN:
      return {
        ...sellerState,
        sellerLoading: true,
      };

    case SELLER_MOBILE_UPDATE_SUCCESS:
      return {
        ...sellerState,
        sellerLoading: false,
        sellerMobiles: sellerState.sellerMobiles.map((m) => {
          if (m._id === action.payload._id) return action.payload;
          return m;
        }),
      };

    case SELLER_MOBILE_UPDATE_ERROR:
      return {
        ...sellerState,
        sellerLoading: false,
        sellerError: true,
      };

    case SELLER_CLEAR_STATE:
      return {
        sellerMobiles: [],
        sellerLoading: false,
        sellerError: false,
      };

    default:
      return sellerState;
  }
};

export default seller;

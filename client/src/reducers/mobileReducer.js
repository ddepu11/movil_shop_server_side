import {
  MOBILE_CLEAR_SAVED,
  MOBILE_CREATE_BEGIN,
  MOBILE_CREATE_ERROR,
  MOBILE_CREATE_SUCCESS,
  MOBILE_GET_BEGIN,
  MOBILE_GET_ERROR,
  MOBILE_GET_SUCCESS,
  MOBILE_GIVE_REVIEW_BEGIN,
  MOBILE_GIVE_REVIEW_ERROR,
  MOBILE_GIVE_REVIEW_SUCCESS,
  MOBILE_LIST_BEGIN,
  MOBILE_LIST_ERROR,
  MOBILE_LIST_SUCCESS,
  MOBILE_UPDATE_REVIEW_BEGIN,
  MOBILE_UPDATE_REVIEW_ERROR,
  MOBILE_UPDATE_REVIEW_SUCCESS,
} from '../constants/mobileConstants';

const initialState = {
  mobiles: [],
  mobileSaved: false,
  mobileLoading: false,
  mobileError: false,
  mobile: {},
};

const mobile = (mobileState = initialState, action) => {
  switch (action.type) {
    case MOBILE_CREATE_BEGIN:
      return { ...mobileState, mobileLoading: true };

    case MOBILE_CREATE_SUCCESS:
      return {
        ...mobileState,
        mobileLoading: false,
        mobileSaved: true,
      };

    case MOBILE_CREATE_ERROR:
      return {
        ...mobileState,
        mobileLoading: false,
        mobileError: true,
      };

    case MOBILE_CLEAR_SAVED:
      return {
        ...mobileState,
        mobileSaved: false,
      };

    case MOBILE_LIST_BEGIN:
      return {
        ...mobileState,
        mobileLoading: true,
      };

    case MOBILE_LIST_SUCCESS:
      return {
        ...mobileState,
        mobileLoading: false,
        mobiles: action.payload,
      };

    case MOBILE_LIST_ERROR:
      return {
        ...mobileState,
        mobileError: true,
        mobileLoading: false,
      };

    case MOBILE_GET_BEGIN:
      return {
        ...mobileState,
        mobileLoading: true,
      };

    case MOBILE_GET_SUCCESS:
      return {
        ...mobileState,
        mobileLoading: false,
        mobile: action.payload,
      };

    case MOBILE_GET_ERROR:
      return {
        ...mobileState,
        mobileError: true,
      };

    case MOBILE_GIVE_REVIEW_BEGIN:
      return {
        ...mobileState,
        mobileLoading: true,
      };

    case MOBILE_GIVE_REVIEW_SUCCESS:
      return {
        ...mobileState,
        mobileLoading: false,
        mobile: action.payload,
      };

    case MOBILE_GIVE_REVIEW_ERROR:
      return {
        ...mobileState,
        mobileError: true,
      };

    case MOBILE_UPDATE_REVIEW_BEGIN:
      return {
        ...mobileState,
        mobileLoading: true,
      };

    case MOBILE_UPDATE_REVIEW_SUCCESS:
      return {
        ...mobileState,
        mobile: action.payload,
        mobileLoading: false,
      };

    case MOBILE_UPDATE_REVIEW_ERROR:
      return {
        ...mobileState,
        mobileLoading: false,
        mobileError: true,
      };
    default:
      return mobileState;
  }
};

export default mobile;

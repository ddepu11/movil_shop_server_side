import { mobiles, remove, update } from '../api/sellerApi';

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

import { sendNotification } from './notificationActions';

export const listMobiles = (sellerId) => async (dispatch) => {
  dispatch({ type: SELLER_MOBILE_LIST_BEGIN });

  try {
    const res = await mobiles(sellerId);

    if (res) {
      dispatch({ type: SELLER_MOBILE_LIST_SUCCESS, payload: res.data.mobiles });
    } else {
      dispatch({ type: SELLER_MOBILE_LIST_ERROR });

      dispatch(sendNotification('Could not fetch the mobiles!!', true));
    }
  } catch (err) {
    const { msg } = err.response.data;

    dispatch({ type: SELLER_MOBILE_LIST_ERROR });

    dispatch(sendNotification(msg, true));
  }
};

export const removeMobile = (id) => async (dispatch) => {
  dispatch({ type: SELLER_MOBILE_DELETE_BEGIN });

  try {
    const res = await remove(id);

    if (res) {
      dispatch(sendNotification('Successfully removed a mobile!', false));

      dispatch({ type: SELLER_MOBILE_DELETE_SUCCESS, payload: id });
    } else {
      dispatch({ type: SELLER_MOBILE_DELETE_ERROR });

      dispatch(sendNotification('Could not removed a mobile!', true));
    }
  } catch (err) {
    const { msg } = err.response.data;

    dispatch({ type: SELLER_MOBILE_DELETE_ERROR });

    dispatch(sendNotification(msg, true));
  }
};

export const updateSellerMobile =
  (mobileInfo, mobileId) => async (dispatch) => {
    dispatch({ type: SELLER_MOBILE_UPDATE_BEGIN });

    try {
      const res = await update(mobileInfo, mobileId);

      if (res) {
        const { mobile } = res.data;

        dispatch({ type: SELLER_MOBILE_UPDATE_SUCCESS, payload: mobile });

        dispatch(
          sendNotification('Successfully updated the information!', false)
        );
      } else {
        dispatch({ type: SELLER_MOBILE_UPDATE_ERROR });

        dispatch(
          sendNotification('Sorry could not updated the information!', true)
        );
      }
    } catch (err) {
      const { msg } = err.response.data;

      dispatch({ type: SELLER_MOBILE_UPDATE_ERROR });

      dispatch(sendNotification(msg, true));
    }
  };

export const clearSellerState = () => (dispatch) =>
  dispatch({ type: SELLER_CLEAR_STATE });

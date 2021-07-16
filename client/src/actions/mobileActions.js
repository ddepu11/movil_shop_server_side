import {
  create,
  getMobile,
  listAll,
  review,
  updateReview,
} from '../api/mobileApi';

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
import { loadMobiles } from './filterMobileActions';

import { sendNotification } from './notificationActions';
import { listMobiles } from './sellerActions';

export const createMobile = (formData, id) => async (dispatch) => {
  dispatch({ type: MOBILE_CREATE_BEGIN });

  try {
    await create(formData);

    dispatch({ type: MOBILE_CREATE_SUCCESS });

    dispatch(sendNotification('Successfuly saved mobile info!!!', false));

    dispatch(listMobiles(id));
  } catch (err) {
    const { msg } = err.response.data;

    dispatch({ type: MOBILE_CREATE_ERROR });

    dispatch(sendNotification(msg, true));
  }
};

export const clearMobileSaved = () => (dispatch) =>
  dispatch({ type: MOBILE_CLEAR_SAVED });

export const listAllMobiles = () => async (dispatch) => {
  dispatch({ type: MOBILE_LIST_BEGIN });

  try {
    const res = await listAll();

    if (res) {
      dispatch({ type: MOBILE_LIST_SUCCESS, payload: res.data.mobiles });
      dispatch(loadMobiles(res.data.mobiles));
    } else {
      dispatch({ type: MOBILE_LIST_ERROR });

      dispatch(sendNotification('Sorry could not fetch mobiles!', true));
    }
  } catch (err) {
    const { msg } = err.response.data;

    dispatch({ type: MOBILE_LIST_ERROR });

    dispatch(sendNotification(msg, true));
  }
};

export const getMobileById = (id) => async (dispatch) => {
  dispatch({ type: MOBILE_GET_BEGIN });

  try {
    const res = await getMobile(id);

    if (res) {
      dispatch({ type: MOBILE_GET_SUCCESS, payload: res.data.mobile });
    } else {
      dispatch({ type: MOBILE_GET_ERROR });
      dispatch(sendNotification('Could not get the infomation!', true));
    }
  } catch (err) {
    const { msg } = err.response.data;

    dispatch({ type: MOBILE_GET_ERROR });
    dispatch(sendNotification(msg, true));
  }
};

// mobile ID and Stars
export const reviewMobile = (id, stars) => async (dispatch) => {
  dispatch({ type: MOBILE_GIVE_REVIEW_BEGIN });

  try {
    const res = await review(id, stars);

    if (res) {
      dispatch({ type: MOBILE_GIVE_REVIEW_SUCCESS, payload: res.data.mobile });
      dispatch(sendNotification('Submitted a review!', false));
    } else {
      dispatch({ type: MOBILE_GIVE_REVIEW_ERROR });
      dispatch(sendNotification('Could not submit a review!!', true));
    }
  } catch (err) {
    const { msg } = err.response.data;

    dispatch({ type: MOBILE_GIVE_REVIEW_ERROR });

    dispatch(sendNotification(msg, true));
  }
};

// mobile ID and Stars and review Id
export const updateMobileReview =
  (mobileId, stars, reviewId) => async (dispatch) => {
    dispatch({ type: MOBILE_UPDATE_REVIEW_BEGIN });

    try {
      const res = await updateReview(mobileId, stars, reviewId);

      if (res) {
        dispatch({
          type: MOBILE_UPDATE_REVIEW_SUCCESS,
          payload: res.data.mobile,
        });

        dispatch(sendNotification('Updated a review!', false));
      } else {
        dispatch({ type: MOBILE_UPDATE_REVIEW_ERROR });

        dispatch(sendNotification('Could not update a review!!', true));
      }
    } catch (err) {
      const { msg } = err.response.data;

      dispatch({ type: MOBILE_UPDATE_REVIEW_ERROR });

      dispatch(sendNotification(msg, true));
    }
  };

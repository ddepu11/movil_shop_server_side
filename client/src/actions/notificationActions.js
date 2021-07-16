import {
  NOTIFICATION_CLEAR,
  NOTIFICATION_SEND,
} from '../constants/notificationConstants';

export const sendNotification = (msg, danger) => (dispatch) => {
  dispatch({ type: NOTIFICATION_SEND, payload: { msg, danger } });
};

// Clears any notification
export const clearNotification = () => (dispatch) => {
  dispatch({ type: NOTIFICATION_CLEAR });
};

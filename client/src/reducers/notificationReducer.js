import {
  NOTIFICATION_CLEAR,
  NOTIFICATION_SEND,
} from '../constants/notificationConstants';

const initialState = {
  notificationMessage: '',
  danger: false,
};

const notification = (notificationState = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_CLEAR:
      return {
        ...notificationState,
        notificationMessage: '',
        danger: false,
      };

    case NOTIFICATION_SEND:
      return {
        ...notificationState,
        notificationMessage: action.payload.msg,
        danger: action.payload.danger,
      };

    default:
      return notificationState;
  }
};

export default notification;

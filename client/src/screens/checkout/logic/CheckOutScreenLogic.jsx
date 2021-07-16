import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendNotification } from '../../../actions/notificationActions';
import { createAnOrder } from '../../../actions/paymentActions';
import { saveUserDeliveryAddress } from '../../../actions/userActions';
import clearAllSetTimeOut from '../../../utils/clearAllSetTimeOut';
import validateDeliveryAddress from '../../../utils/validateDeliveryAddress';

const CheckOutScreenLogic = () => {
  const { userInfo, userLoading, hasUserLoggedIn } = useSelector(
    (state) => state.user
  );

  const { paymentLoading, paymentSuccess } = useSelector(
    (state) => state.payment
  );

  const history = useHistory();

  const dispatch = useDispatch();

  const [deliveryAddress, setDeliveryAddress] = useState({
    state: '',
    city: '',
    address: '',
    pincode: '',
  });

  const handleDeliveryAddress = (e) => {
    const { name, value } = e.target;

    if (name === 'pincode') {
      setDeliveryAddress((prevState) => ({ ...prevState, [name]: +value }));
    } else {
      setDeliveryAddress((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const setTimeOutId = useRef();

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0 && userInfo.cart.length === 0) {
      history.push('/cart');

      dispatch(
        sendNotification('Nothing to checkout,your cart is empty !', true)
      );
    }

    if (!hasUserLoggedIn) {
      history.push('/sign-in');

      dispatch(sendNotification('Please log in to checkout!', true));
    }

    if (paymentSuccess && hasUserLoggedIn) {
      history.push('/orders');
    }

    if (
      Object.keys(userInfo).length !== 0 &&
      Object.keys(userInfo.deliveryAddress).length !== 0
    ) {
      setDeliveryAddress((prevState) => ({
        ...prevState,
        ...userInfo.deliveryAddress,
      }));
    }

    return () => clearAllSetTimeOut(setTimeOutId);
  }, [hasUserLoggedIn, history, dispatch, paymentSuccess, userInfo]);

  const { totalPrice, discount } = useSelector((state) => state.orderTotal);

  const handlePay = () => {
    if (
      deliveryAddress.address === '' ||
      Object.keys(userInfo.deliveryAddress).length === 0
    ) {
      dispatch(sendNotification('Please fill your full address!!', true));
    } else {
      dispatch(
        createAnOrder(
          {
            totalPrice: totalPrice - discount,
            name: `${userInfo.firstName} ${userInfo.lastName}`,
            email: userInfo.email,
            contact: userInfo.phoneNumber,
            userId: userInfo._id,
          },
          { cart: userInfo.cart }
        )
      );
    }
  };

  const pinCodeValidationMessageRef = useRef();
  const stateValidationMessageRef = useRef(null);
  const cityValidationMessageRef = useRef(null);
  const addressValidationMessageRef = useRef(null);

  const saveDeliveryAddress = () => {
    const errorFlag = validateDeliveryAddress(
      {
        pinCodeValidationMessageRef,
        stateValidationMessageRef,
        cityValidationMessageRef,
        addressValidationMessageRef,
      },
      deliveryAddress,
      setTimeOutId
    );

    if (
      !errorFlag &&
      deliveryAddress.pincode === userInfo.deliveryAddress.pincode &&
      deliveryAddress.state === userInfo.deliveryAddress.state &&
      deliveryAddress.city === userInfo.deliveryAddress.city &&
      deliveryAddress.address === userInfo.deliveryAddress.address
    ) {
      dispatch(
        sendNotification('Address has not changed, nothing to change!', true)
      );
    } else if (!errorFlag) {
      dispatch(saveUserDeliveryAddress(userInfo._id, deliveryAddress));
    }
  };

  return {
    userLoading,
    paymentLoading,
    handleDeliveryAddress,
    handlePay,
    userInfo,
    deliveryAddress,
    saveDeliveryAddress,
    pinCodeValidationMessageRef,
    stateValidationMessageRef,
    cityValidationMessageRef,
    addressValidationMessageRef,
  };
};

export default CheckOutScreenLogic;

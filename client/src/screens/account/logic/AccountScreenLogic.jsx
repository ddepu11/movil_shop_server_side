import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendNotification } from '../../../actions/notificationActions';
import { clearPaymentState } from '../../../actions/paymentActions';
import { getAccountInfo, updateUser } from '../../../actions/userActions';
import clearAllSetTimeOut from '../../../utils/clearAllSetTimeOut';
import validateForm from '../../../utils/validateForm';

const AccountScreenLogic = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { hasUserError, hasUserLoggedIn, userInfo, userLoading } = useSelector(
    (state) => state.user
  );

  const setTimeOutId = useRef();

  useEffect(() => {
    const isUserObjEmpty = Object.keys(userInfo).length === 0;

    if (!hasUserLoggedIn && isUserObjEmpty) {
      history.push('/sign-in');
    }

    dispatch(clearPaymentState());

    isUserObjEmpty && dispatch(getAccountInfo());

    hasUserError && clearAllSetTimeOut(setTimeOutId);

    return () => clearAllSetTimeOut(setTimeOutId);

    // eslint-disable-next-line
  }, [hasUserLoggedIn, userInfo, hasUserError]);

  const { firstName, lastName, email, phoneNumber, gender, password, _id } =
    userInfo;

  const [wannaEdit, setWannaEdit] = useState(false);

  const [info, setInfo] = useState({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword: '*************************************************',
  });

  const initiateUpdateProcess = () => {
    setWannaEdit(true);
    setInfo({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword: password,
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInfo({ ...info, [name]: value });
  };

  // Cancel update process
  const cancelUpdate = () => {
    clearAllSetTimeOut(setTimeOutId);
    setWannaEdit(false);
    setInfo({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword: password,
    });
  };

  // Reference to diff message paragraph
  const firstNameValidationMessageTag = useRef(null);
  const lastNameValidationMessageTag = useRef(null);
  const passwordValidationMessageTag = useRef(null);
  const phoneNumberValidationMessageTag = useRef(null);
  const emailValidationMessageTag = useRef(null);
  const confirmPasswordValidationMessageTag = useRef(null);

  // Update User Information
  const updateInfo = () => {
    const errorFlag = validateForm(
      {
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        phoneNumber: info.phoneNumber,
        password: info.password,
        confirmPassword: info.confirmPassword,
      },
      setTimeOutId,
      {
        firstNameValidationMessageTag,
        lastNameValidationMessageTag,
        passwordValidationMessageTag,
        phoneNumberValidationMessageTag,
        emailValidationMessageTag,
        confirmPasswordValidationMessageTag,
      }
    );

    if (!errorFlag) {
      // If info is same dont update
      if (
        info.password === userInfo.password &&
        info.firstName === userInfo.firstName &&
        info.lastName === userInfo.lastName &&
        info.email === userInfo.email &&
        info.phoneNumber === userInfo.phoneNumber
      ) {
        dispatch(sendNotification('Sorry there is nothing to update!!!', true));
        setWannaEdit(false);
        clearAllSetTimeOut(setTimeOutId);
      } else {
        // if email same and phone no isn't dont sent email
        if (
          info.email === userInfo.email &&
          info.phoneNumber !== userInfo.phoneNumber
        ) {
          dispatch(
            updateUser(
              {
                firstName: info.firstName,
                lastName: info.lastName,
                phoneNumber: info.phoneNumber,
                password: info.password,
              },
              _id
            )
          );
          // if phone no same and email isn't dont sent phone no
        } else if (
          info.phoneNumber === userInfo.phoneNumber &&
          info.email !== userInfo.email
        ) {
          dispatch(
            updateUser(
              {
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
                password: info.password,
              },
              _id
            )
          );
          // if email and phone number same don't sent them
        } else if (
          info.phoneNumber === userInfo.phoneNumber &&
          info.email === userInfo.email
        ) {
          dispatch(
            updateUser(
              {
                firstName: info.firstName,
                lastName: info.lastName,
                password: info.password,
              },
              _id
            )
          );
        }

        setWannaEdit(false);
      }
    }
  };

  return {
    updateInfo,
    cancelUpdate,
    handleInput,
    initiateUpdateProcess,
    wannaEdit,
    gender,
    userLoading,
    firstName,
    lastName,
    email,
    phoneNumber,
    info,
    firstNameValidationMessageTag,
    lastNameValidationMessageTag,
    emailValidationMessageTag,
    phoneNumberValidationMessageTag,
    passwordValidationMessageTag,
    confirmPasswordValidationMessageTag,
  };
};

export default AccountScreenLogic;

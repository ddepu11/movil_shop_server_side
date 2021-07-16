import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  clearUserSignUpSuccess,
  customUserSignIn,
} from '../../../actions/userActions';

import clearAllSetTimeOut from '../../../utils/clearAllSetTimeOut';

import validateForm from '../../../utils/validateForm';

const SignInScreenLogic = () => {
  const { hasUserLoggedIn, userLoading, userSignUpSuccess } = useSelector(
    (state) => state.user
  );

  const emailValidationMessageTag = useRef(null);
  const passwordValidationMessageTag = useRef(null);

  const setTimeOutId = useRef();

  const { loginWithRedirect } = useAuth0();

  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  useEffect(() => {
    userSignUpSuccess && dispatch(clearUserSignUpSuccess());

    hasUserLoggedIn && history.push('/account');

    // Clearing all the setTimeouts while unmounting the components
    return () => clearAllSetTimeOut(setTimeOutId);
  }, [hasUserLoggedIn, userSignUpSuccess, dispatch, history]);

  const handleInput = (e) => {
    const { value, name } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = userCredentials;

    const error = validateForm(
      userCredentials,
      setTimeOutId,
      {
        emailValidationMessageTag,
        passwordValidationMessageTag,
      },
      'SIGN_IN'
    );

    if (!error) {
      dispatch(customUserSignIn(email, password));
      setUserCredentials({ password: '', email: '' });
    }
  };

  return {
    userLoading,
    handleSubmit,
    handleInput,
    loginWithRedirect,
    userCredentials,
    emailValidationMessageTag,
    passwordValidationMessageTag,
  };
};

export default SignInScreenLogic;

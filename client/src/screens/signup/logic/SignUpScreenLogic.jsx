import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../../actions/userActions';
import clearAllSetTimeOut from '../../../utils/clearAllSetTimeOut';
import validateForm from '../../../utils/validateForm';

const SignUpScreenLogic = () => {
  const { userSignUpSuccess } = useSelector((state) => state.user);

  const setTimeOutId = useRef();

  const dispatch = useDispatch();

  useEffect(
    () =>
      // userSignUpSuccess && dispatch()
      // Clearing all the setTimeouts while unmounting the components
      () =>
        clearAllSetTimeOut(setTimeOutId)
  );

  const { userLoading } = useSelector((state) => state.user);

  // Referene for error
  const firstNameValidationMessageTag = useRef(null);
  const lastNameValidationMessageTag = useRef(null);
  const passwordValidationMessageTag = useRef(null);
  const phoneNumberValidationMessageTag = useRef(null);
  const emailValidationMessageTag = useRef(null);
  const confirmPasswordValidationMessageTag = useRef(null);

  const dpValidationMessageTag = useRef(null);
  const genderValidationMessageTag = useRef(null);

  const [signUpCredentials, setSignUpCredentials] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    role: 'USER',
  });

  const [dp, setDP] = useState('');

  // let errorFlag = false;

  const handleInput = (e) => {
    const { value, name, checked } = e.target;
    if (name === 'role') {
      checked
        ? setSignUpCredentials({ ...signUpCredentials, [name]: 'SELLER' })
        : setSignUpCredentials({ ...signUpCredentials, [name]: 'USER' });
    } else {
      setSignUpCredentials({ ...signUpCredentials, [name]: value });
    }
  };

  const dbLabelRef = useRef();

  // Setting the img to the state
  const handleDP = (e) => {
    dbLabelRef.current.innerText = `${e.target.files[0].name}`;
    const span = document.createElement('span');
    span.classList.add('browse_btn');
    span.innerText = 'Browse';
    dbLabelRef.current.appendChild(span);

    setDP(e.target.files[0]);
  };

  // Appending signup credentials to formData object
  const appendDataToFD = (fd) => {
    const k = Object.keys(signUpCredentials);
    const v = Object.values(signUpCredentials);

    for (let a = 0; a < k.length; a += 1) {
      fd.append(k[a].toString().trim(), v[a]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorFlag = validateForm(
      {
        firstName: signUpCredentials.firstName,
        lastName: signUpCredentials.lastName,
        email: signUpCredentials.email,
        phoneNumber: signUpCredentials.phoneNumber,
        password: signUpCredentials.password,
        confirmPassword: signUpCredentials.confirmPassword,
        gender: signUpCredentials.gender,
      },
      setTimeOutId,
      {
        firstNameValidationMessageTag,
        lastNameValidationMessageTag,
        passwordValidationMessageTag,
        phoneNumberValidationMessageTag,
        emailValidationMessageTag,
        confirmPasswordValidationMessageTag,
        genderValidationMessageTag,
      },
      'SIGN_UP'
    );

    const formData = new FormData();

    dp !== '' && formData.append('dp', dp);

    if (!errorFlag) {
      appendDataToFD(formData);
      dispatch(signUpUser(formData));
    }
  };

  return {
    userSignUpSuccess,
    userLoading,
    handleSubmit,
    handleDP,
    dpValidationMessageTag,
    handleInput,
    signUpCredentials,
    firstNameValidationMessageTag,
    lastNameValidationMessageTag,
    genderValidationMessageTag,
    phoneNumberValidationMessageTag,
    emailValidationMessageTag,
    passwordValidationMessageTag,
    confirmPasswordValidationMessageTag,
    dbLabelRef,
  };
};

export default SignUpScreenLogic;

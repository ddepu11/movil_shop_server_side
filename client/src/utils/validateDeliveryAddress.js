import setValidationMessage from './setValidationMessage';

const validateDeliveryAddress = (
  messageRefs,
  deliveryAddress,
  setTimeOutId
) => {
  const {
    pinCodeValidationMessageRef,
    stateValidationMessageRef,
    cityValidationMessageRef,
    addressValidationMessageRef,
  } = messageRefs;

  const { state, city, address, pincode } = deliveryAddress;

  let flag = false;

  // State Validation
  if (!state) {
    setValidationMessage(
      stateValidationMessageRef,
      'Please select your state!',
      'error',
      setTimeOutId
    );

    flag = true;
  }

  if (state === '--Select State--') {
    setValidationMessage(
      stateValidationMessageRef,
      'Please select your state!',
      'error',
      setTimeOutId
    );
    flag = true;
  }

  // ################## State Ends ######################

  // City Validation

  // if (!city) {
  //   setValidationMessage(
  //     cityValidationMessageRef,
  //     "City can't be empty",
  //     'error',
  //     setTimeOutId
  //   );
  // }

  if (city.length <= 2 || city.length >= 15) {
    setValidationMessage(
      cityValidationMessageRef,
      'Enter valid city!',
      'error',
      setTimeOutId
    );
    flag = true;
  }

  if (!city) {
    setValidationMessage(
      cityValidationMessageRef,
      "City can't be empty",
      'error',
      setTimeOutId
    );
    flag = true;
  }

  // ################## City Ends ######################

  // Address Validation
  if (address.length < 20) {
    setValidationMessage(
      addressValidationMessageRef,
      'Enter your full address!',
      'error',
      setTimeOutId
    );
    flag = true;
  }

  if (address.length > 60) {
    setValidationMessage(
      addressValidationMessageRef,
      'Address is Too long!',
      'error',
      setTimeOutId
    );
    flag = true;
  }

  if (!address) {
    setValidationMessage(
      addressValidationMessageRef,
      "Address can't be empty",
      'error',
      setTimeOutId
    );
    flag = true;
  }

  // ################### Address ##########################

  // PinCode

  if (String(pincode).length < 6 || String(pincode).length > 6) {
    setValidationMessage(
      pinCodeValidationMessageRef,
      'Invalid Pincode',
      'error',
      setTimeOutId
    );

    flag = true;
  }

  if (!pincode) {
    setValidationMessage(
      pinCodeValidationMessageRef,
      "Pincode can't be empty",
      'error',
      setTimeOutId
    );
    flag = true;
  }

  return flag;
  // #########################################################
};

export default validateDeliveryAddress;

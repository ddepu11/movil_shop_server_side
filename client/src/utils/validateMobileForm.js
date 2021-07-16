import setValidationMessage from './setValidationMessage';

const validateMobileForm = (
  mobileInfo,
  setTimeOutId,
  allValidationMessageTags
) => {
  const {
    titleMessageRefTag,
    priceMessageRefTag,
    brandMessageRefTag,
    internalMemoryMessageRefTag,
    ramMessageRefTag,
    osMessageRefTag,
    batteryMessageRefTag,
    processorMessageRefTag,
    cameraMessageRefTag,
    imageUploadValidationMessageTag,
    colorsMessageRefTag,
  } = allValidationMessageTags;

  let errorFlag = false;

  const {
    title,
    price,
    brand,
    internalMemory,
    ram,
    os,
    battery,
    processor,
    camera,
    files,
    colors,
  } = mobileInfo;

  // Ttitle

  if (title.length === 1) {
    setValidationMessage(
      titleMessageRefTag,
      'Title is too short!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  if (!title) {
    setValidationMessage(
      titleMessageRefTag,
      'text field cant be empty!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // %%%%%%%%%%%%%%% Ttitle Ends %%%%%%%%%%%%%%%%%%%%%%%

  // Price

  if (+price < 1000) {
    setValidationMessage(
      priceMessageRefTag,
      'price is too low!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  if (!price) {
    setValidationMessage(
      priceMessageRefTag,
      'price field cant be empty!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // %%%%%%%%%%%%%%% Price Ends %%%%%%%%%%%%%%%%%%%%%%%

  // Brand

  if (brand.length === 1) {
    setValidationMessage(
      brandMessageRefTag,
      'brand name is too short!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  if (!brand) {
    setValidationMessage(
      brandMessageRefTag,
      'brand field cant be empty!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }
  // %%%%%%%%%%%%%%% Brand Ends %%%%%%%%%%%%%%%%%%%%%%%

  // Internal Memory
  if (+internalMemory < 8) {
    setValidationMessage(
      internalMemoryMessageRefTag,
      'Internal memory is too low!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  if (!internalMemory) {
    setValidationMessage(
      internalMemoryMessageRefTag,
      'Internal memory field cant be empty!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // %%%%%%%%%%%%%%% Brand Ends %%%%%%%%%%%%%%%%%%%%%%%

  // Ram
  if (+ram < 4) {
    setValidationMessage(
      ramMessageRefTag,
      'ram is too low!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  if (!ram) {
    setValidationMessage(
      ramMessageRefTag,
      'ram field cant be empty!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // %%%%%%%%%%%%%%% Ram Ends %%%%%%%%%%%%%%%%%%%%%%%

  // Operation System

  if (!os) {
    setValidationMessage(
      osMessageRefTag,
      'os field cant be empty!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // %%%%%%%%%%%%%%% OS Ends %%%%%%%%%%%%%%%%%%%%%%%

  // Battery

  if (!battery) {
    setValidationMessage(
      batteryMessageRefTag,
      'battery field cant be empty!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  if (+battery < 3000) {
    setValidationMessage(
      batteryMessageRefTag,
      'battery capacity is too small!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // %%%%%%%%%%%%%%% Battery Ends %%%%%%%%%%%%%%%%%%%%%%%

  // Processor
  if (!processor) {
    setValidationMessage(
      processorMessageRefTag,
      'processor field cant be empty!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // %%%%%%%%%%%%%%% Processor %%%%%%%%%%%%%%%%%%%%%%%

  // Camera
  if (+camera < 2) {
    setValidationMessage(
      cameraMessageRefTag,
      'camera mp is too low!',
      'error',
      setTimeOutId
    );

    errorFlag = true;
  }

  if (!camera) {
    setValidationMessage(
      cameraMessageRefTag,
      'camera field cant be empty!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // %%%%%%%%%%%%%%% Camera Ends %%%%%%%%%%%%%%%%%%%%%%%

  // Colors
  if (colors && colors.length === 0) {
    setValidationMessage(
      colorsMessageRefTag,
      'Please select atleast one color!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }
  // %%%%%%%%%%%%%%% Camera Ends %%%%%%%%%%%%%%%%%%%%%%%

  // Images
  if (files && files.length === 0) {
    setValidationMessage(
      imageUploadValidationMessageTag,
      'please select atleast 1 image file!',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // %%%%%%%%%%%%%%% Images Ends %%%%%%%%%%%%%%%%%%%%%%%

  return errorFlag;
};

export default validateMobileForm;

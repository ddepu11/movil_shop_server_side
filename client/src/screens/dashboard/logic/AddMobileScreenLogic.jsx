import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createMobile } from '../../../actions/mobileActions';
import { sendNotification } from '../../../actions/notificationActions';
import clearAllSetTimeOut from '../../../utils/clearAllSetTimeOut';
import validateMobileForm from '../../../utils/validateMobileForm';

const AddMobileScreenLogic = () => {
  const history = useHistory();

  const {
    userInfo: { _id, email, firstName, lastName },
  } = useSelector((state) => state.user);

  const { mobileSaved } = useSelector((state) => state.mobile);

  const setTimeOutId = useRef(0);

  // Clearing all set timeouts
  useEffect(() => {
    mobileSaved && history.push('/dashboard/all-mobiles');

    return () => clearAllSetTimeOut(setTimeOutId);
  }, [mobileSaved, history]);

  const [mobileInfo, setMobileInfo] = useState({
    title: '',
    price: '',
    brand: '',
    internalMemory: '',
    ram: '',
    os: '',
    battery: '',
    processor: '',
    camera: '',
    colors: [],
    previews: [],
    files: [],
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMobileInfo({ ...mobileInfo, [name]: value });
  };

  const titleMessageRefTag = useRef(null);
  const priceMessageRefTag = useRef(null);
  const brandMessageRefTag = useRef(null);
  const internalMemoryMessageRefTag = useRef(null);
  const ramMessageRefTag = useRef(null);
  const osMessageRefTag = useRef(null);
  const batteryMessageRefTag = useRef(null);
  const processorMessageRefTag = useRef(null);
  const cameraMessageRefTag = useRef(null);
  const imageUploadValidationMessageTag = useRef(null);
  const colorsMessageRefTag = useRef(null);

  const handleMobileImages = (e) => {
    const { previews, files: prevFiles } = mobileInfo;

    const { files } = e.target;
    const pics = Array.from(files);

    previews.length = 0;
    prevFiles.length = 0;

    setMobileInfo({
      ...mobileInfo,
      previews: [...previews],
      files: [...prevFiles],
    });

    pics.forEach(async (el, index) => {
      const fileSRC = URL.createObjectURL(el);

      if (index < 6) {
        setMobileInfo((prevState) => ({
          ...prevState,
          previews: [...prevState.previews, fileSRC],
          files: [...prevState.files, el],
        }));
      }
    });
  };

  const dispatch = useDispatch();

  const addMoreImages = (e) => {
    const { files: prevFiles } = mobileInfo;
    const { files } = e.target;
    let pics = Array.from(files);

    for (let i = 0; i < prevFiles.length; i += 1) {
      pics = pics.filter((el) => el.name !== prevFiles[i].name);
    }

    if (prevFiles.length < 6) {
      pics.forEach((el) => {
        const fileSRC = URL.createObjectURL(el);

        setMobileInfo((prevState) => ({
          ...prevState,
          previews: [...prevState.previews, fileSRC],
          files: [...prevState.files, el],
        }));
      });
    } else {
      dispatch(sendNotification('Cant upload more then 6 images!!!', true));
    }
  };

  // Remove a perticular image
  const removeAPreviewImage = (file, preview) => {
    const newPrev = mobileInfo.previews.filter((el) => el !== preview);
    const newFiles = mobileInfo.files.filter((el) => el.name !== file.name);

    setMobileInfo((prevState) => ({
      ...prevState,
      previews: [...newPrev],
      files: [...newFiles],
    }));

    dispatch(sendNotification(`Removed a preview image!!!`, true));
  };

  // Color Handing
  const mobileColors = ['red', 'white', 'black', '#FFD700', 'grey'];

  const handleColors = (e) => {
    const { value } = e.target.dataset;

    setMobileInfo((prevState) => {
      // if color already exits reomve it
      if (prevState.colors.includes(value)) {
        return {
          ...prevState,
          colors: [...prevState.colors.filter((c) => c !== value)],
        };
      }

      return { ...prevState, colors: [...prevState.colors, value.trim()] };
    });
  };

  const handleSubmit = () => {
    const errorFlag = validateMobileForm(mobileInfo, setTimeOutId, {
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
    });

    if (!errorFlag) {
      const formData = new FormData();

      const k = Object.keys(mobileInfo);
      const v = Object.values(mobileInfo);

      formData.append('sellerId', _id);

      formData.append('sellerEmail', email);

      formData.append('sellerName', `${firstName} ${lastName}`);

      for (let i = 0; i < k.length; i += 1) {
        // Exculding previews
        if (k[i] !== 'previews' && k[i] !== 'files') {
          formData.append(k[i].toString().trim(), v[i]);
        }
      }

      mobileInfo.files.forEach((f) => {
        formData.append(`mobilePics`, f);
      });

      dispatch(createMobile(formData, _id));
    }
  };

  return {
    handleSubmit,
    handleColors,
    mobileColors,
    removeAPreviewImage,
    addMoreImages,
    handleMobileImages,
    handleInput,
    mobileInfo,
    priceMessageRefTag,
    titleMessageRefTag,
    colorsMessageRefTag,
    processorMessageRefTag,
    batteryMessageRefTag,
    ramMessageRefTag,
    imageUploadValidationMessageTag,
    internalMemoryMessageRefTag,
    cameraMessageRefTag,
    osMessageRefTag,
    brandMessageRefTag,
  };
};

export default AddMobileScreenLogic;

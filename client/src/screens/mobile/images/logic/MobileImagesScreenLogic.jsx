import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MobileImagesScreenLogic = () => {
  const {
    mobile: { pictures, title, sellerInfo },
  } = useSelector((state) => state.mobile);

  const [preview, setPreview] = useState('');

  useEffect(() => {
    sellerInfo && setPreview(`/sellers/${sellerInfo.id}/${pictures[0]}`);
  }, [pictures, sellerInfo]);

  const handleHover = (e) => {
    setPreview(e.target.src);
  };

  return { handleHover, preview, title, pictures, sellerInfo };
};

export default MobileImagesScreenLogic;

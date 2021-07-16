import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMobiles, removeMobile } from '../../../actions/sellerActions';

const AllMobilesScreenLogic = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { sellerLoading, sellerMobiles } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0 && sellerMobiles.length === 0)
      dispatch(listMobiles(userInfo._id));
  }, [dispatch, userInfo, sellerMobiles]);

  const handleDeleteMobile = (id) => {
    dispatch(removeMobile(id));
  };

  return { handleDeleteMobile, sellerLoading, userInfo, sellerMobiles };
};

export default AllMobilesScreenLogic;

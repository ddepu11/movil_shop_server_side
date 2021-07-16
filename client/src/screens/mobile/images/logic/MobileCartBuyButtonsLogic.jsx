import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addMobileToLocalStorageCart } from '../../../../actions/cartActions';
import { sendNotification } from '../../../../actions/notificationActions';
import { addMobileToCart } from '../../../../actions/userActions';

const MobileCartBuyButtonsLogic = (color) => {
  const {
    mobile: { pictures, title, sellerInfo, _id: mobileId, price },
  } = useSelector((state) => state.mobile);

  const history = useHistory();

  const dispatch = useDispatch();

  const {
    id: userId,
    hasUserLoggedIn,
    userInfo: { cart },
  } = useSelector((state) => state.user);

  const handleAddToCart = () => {
    if (!color) {
      dispatch(sendNotification('Please select color!!!', true));
    } else {
      if (!hasUserLoggedIn) {
        const quantity = 1;
        dispatch(
          addMobileToLocalStorageCart({
            mobileId,
            picture: pictures[0],
            title,
            color,
            sellerName: sellerInfo.name,
            sellerId: sellerInfo.id,
            price,
            quantity,
          })
        );
      } else {
        // If user logged in then save car to db

        // Check have you already added mobile to cart
        let mobileExistsInCart = false;

        cart.forEach((m) => {
          if (m.mobileId === mobileId) mobileExistsInCart = true;
        });

        !mobileExistsInCart
          ? dispatch(
              addMobileToCart(userId, {
                mobileId,
                picture: pictures[0],
                title,
                color,
                sellerName: sellerInfo.name,
                sellerId: sellerInfo.id,
                price,
              })
            )
          : dispatch(
              sendNotification('You have already added to cart!', false)
            );
      }

      history.push('/cart');
    }
  };

  return { handleAddToCart };
};

export default MobileCartBuyButtonsLogic;

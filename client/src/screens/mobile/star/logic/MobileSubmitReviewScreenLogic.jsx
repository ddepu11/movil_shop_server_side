import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  reviewMobile,
  updateMobileReview,
} from '../../../../actions/mobileActions';
import { sendNotification } from '../../../../actions/notificationActions';

const MobileSubmitReviewScreenLogic = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const {
    mobile: { _id, reviews },
  } = useSelector((state) => state.mobile);

  const { userInfo, hasUserLoggedIn, id } = useSelector((state) => state.user);

  // Submitting Mobile Stars
  const [stars, setStars] = useState(0);

  const [oldReview, setOldReview] = useState({
    reviewId: '',
    stars: 0,
  });

  const increaseStar = (value) => {
    setStars(value);
  };

  const decreaseStar = () => {
    setStars(stars - 1);
  };

  const handleReviewSubmit = () => {
    if (!hasUserLoggedIn && Object.keys(userInfo).length === 0) {
      dispatch(sendNotification('Please sign in to give review!', true));
      history.push('/sign-in');
    } else {
      // mobile ID and Stars
      dispatch(reviewMobile(_id, stars));
    }
  };

  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  useEffect(() => {
    reviews &&
      reviews.forEach((r) => {
        if (r.id === id) {
          setStars(r.stars);

          setOldReview((prevState) => ({
            ...prevState,
            reviewId: r._id,
            stars: r.stars,
          }));
          setAlreadyReviewed(true);
        }
      });
  }, [reviews, id]);

  const handleCancelSubmitReview = () => {
    setStars(0);
  };

  const handleUpdateReview = () => {
    if (oldReview.stars === stars) {
      dispatch(sendNotification("You haven't change the review!!", true));
    } else {
      dispatch(updateMobileReview(_id, stars, oldReview.reviewId));
    }
  };

  return {
    handleUpdateReview,
    handleCancelSubmitReview,
    alreadyReviewed,
    handleReviewSubmit,
    increaseStar,
    decreaseStar,
    stars,
  };
};

export default MobileSubmitReviewScreenLogic;

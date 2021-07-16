import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearMobileSaved } from '../../../actions/mobileActions';
import { sendNotification } from '../../../actions/notificationActions';
import { getAccountInfo } from '../../../actions/userActions';

const DashboardScreenLogic = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { userInfo, hasUserLoggedIn, role } = useSelector(
    (state) => state.user
  );
  const { mobileSaved, mobileLoading } = useSelector((state) => state.mobile);

  useEffect(() => {
    mobileSaved && dispatch(clearMobileSaved());

    Object.keys(userInfo).length === 0 && dispatch(getAccountInfo());

    if (role !== 'SELLER') {
      dispatch(
        sendNotification(
          'Sorry, You have no permission to access the dashboard page!!',
          true
        )
      );
      history.push('/sign-in');
    }

    !hasUserLoggedIn && history.push('/sign-in');
  }, [userInfo, dispatch, history, hasUserLoggedIn, mobileSaved, role]);

  return { mobileLoading };
};

export default DashboardScreenLogic;

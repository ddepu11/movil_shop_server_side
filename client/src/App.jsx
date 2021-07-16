import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/Notification';
import Loading from './components/Loading';
import HomeScreen from './screens/HomeScreen';
import NavbarScreen from './screens/NavbarScreen';
import AboutScreen from './screens/AboutScreen';
import SignUpScreen from './screens/signup/SignUpScreen';
import SignInScreen from './screens/signin/SignInScreen';
import FooterScreen from './screens/FooterScreen';
import AccountScreen from './screens/account/AccountScreen';
import MobilesScreen from './screens/mobiles/MobilesScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import { authenticateUser } from './actions/userActions';
import { listAllMobiles } from './actions/mobileActions';
import MobileScreen from './screens/mobile/MobileScreen';
import CartScreen from './screens/cart/CartScreen';
import CheckOutScreen from './screens/checkout/CheckOutScreen';
import OrdersScreen from './screens/orders/OrdersScreen';

const App = () => {
  const { isLoading } = useAuth0();

  const { notificationMessage, danger } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();

  const { hasUserLoggedIn } = useSelector((state) => state.user);
  const { mobileSaved } = useSelector((state) => state.mobile);

  useEffect(() => {
    dispatch(listAllMobiles());
    !hasUserLoggedIn && dispatch(authenticateUser());
  }, [hasUserLoggedIn, dispatch, mobileSaved]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <Router>
          {notificationMessage && (
            <Notification
              msg={notificationMessage.toString()}
              color={danger ? 'var(--danger-color)' : 'var(--success-color)'}
            />
          )}

          <NavbarScreen />

          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>

            <Route exact path="/about">
              <AboutScreen />
            </Route>

            <Route exact path="/sign-in">
              <SignInScreen />
            </Route>

            <Route exact path="/sign-up">
              <SignUpScreen />
            </Route>

            <Route exact path="/mobiles">
              <MobilesScreen />
            </Route>

            <Route exact path="/account">
              <AccountScreen />
            </Route>

            <Route path="/dashboard">
              <DashboardScreen />
            </Route>

            <Route path="/mobiles/:mobileId">
              <MobileScreen />
            </Route>

            <Route path="/cart">
              <CartScreen />
            </Route>

            <Route path="/checkout">
              <CheckOutScreen />
            </Route>
            <Route path="/orders">
              <OrdersScreen />
            </Route>
          </Switch>
          <FooterScreen />
        </Router>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  position: relative;
`;

export default App;

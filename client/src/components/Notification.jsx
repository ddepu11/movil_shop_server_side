import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { clearNotification } from '../actions/notificationActions';

const Notification = ({ msg, color }) => {
  const dispatch = useDispatch();

  const [top, setTop] = useState(`${window.pageYOffset + 180}px`);

  const respondScroll = () => {
    setTop(`${window.pageYOffset + 120}px`);
  };

  useEffect(() => {
    window.addEventListener('scroll', respondScroll);

    setTimeout(() => {
      dispatch(clearNotification());
    }, 4000);

    return () => {
      window.removeEventListener('scroll', respondScroll);
    };
  }, [dispatch]);

  return (
    <Wrapper style={{ background: color, top }}>
      <h2>{msg}</h2>
    </Wrapper>
  );
};

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  width: auto;
  margin: 0 auto;
  color: #fdfdfd;
  text-align: center;
  padding: 6px 20px;
  letter-spacing: 3px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  h2 {
    font-size: 1.2em;
  }
`;

export default Notification;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMobileById } from '../../actions/mobileActions';
import Loading from '../../components/Loading';
import MobileImagesScreen from './images/MobileImagesScreen';
import MobileInfoScreen from './MobileInfoScreen';
import Hero from '../../components/Hero';

const MobileScreen = () => {
  const { mobileId } = useParams();

  const dispatch = useDispatch();

  const { mobile, mobileLoading } = useSelector((state) => state.mobile);

  useEffect(() => {
    dispatch(getMobileById(mobileId));
  }, [dispatch, mobileId]);

  const [color, setColor] = useState('');

  if (mobileLoading) {
    return <Loading />;
  }

  return (
    <>
      <Hero title={`mobiles / ${mobile.title}`} />
      <Wrapper className="w-960">
        {mobile && <MobileImagesScreen color={color} />}
        {mobile && <MobileInfoScreen setColor={setColor} color={color} />}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 450px 1fr;
  padding: 20px 10px;
`;

export default MobileScreen;

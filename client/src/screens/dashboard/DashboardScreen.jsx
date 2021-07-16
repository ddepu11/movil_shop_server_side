import React from 'react';
import styled from 'styled-components';
import HeaderScreen from './HeaderScreen';
import SectionScreen from './SectionScreen';
import Loading from '../../components/Loading';
import Hero from '../../components/Hero';
import DashboardScreenLogic from './logic/DashboardScreenLogic';

const DashboardScreen = () => {
  const { mobileLoading } = DashboardScreenLogic();

  if (mobileLoading) {
    return <Loading />;
  }

  return (
    <>
      <Hero title="dashboard" />
      <Wrapper className="w-960">
        <HeaderScreen />
        <SectionScreen />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  padding: 10px 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(80px, 1fr));
  grid-template-rows: minmax(200px, auto);
  gap: 1.5rem;
  grid-template-areas:
    'h h h h'
    's s s s';
`;

export default DashboardScreen;

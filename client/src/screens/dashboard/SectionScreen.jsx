import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import AllMobilesScreen from './AllMobilesScreen';
import AddMobileScreen from './AddMobileScreen';
import NavigationScreen from './NavigationScreen';

const SectionScreen = () => (
  <Wrapper className="card">
    <NavigationScreen />
    <Route exact path="/dashboard/all-mobiles">
      <AllMobilesScreen />
    </Route>

    <Route exact path="/dashboard/add-mobile">
      <AddMobileScreen />
    </Route>
  </Wrapper>
);

const Wrapper = styled.section`
  padding: 12px 10px;
  grid-area: s;
`;

export default SectionScreen;

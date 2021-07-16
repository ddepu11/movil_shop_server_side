import React from 'react';
import styled from 'styled-components';

const Loading = () => (
  <Wrapper>
    <h1>Loading please wait...</h1>
  </Wrapper>
);

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: var(--secondary-color);
  opacity: 0.5;
  h1 {
    font-size: 2.8em;
    color: var(--light-color);
  }
`;

export default Loading;

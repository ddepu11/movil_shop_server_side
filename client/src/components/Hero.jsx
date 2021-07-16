import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Hero = ({ title }) => (
  <Wrapper>
    <div className="w-960">
      <h1>Home / {title}</h1>
    </div>
  </Wrapper>
);

Hero.propTypes = {
  title: PropTypes.string.isRequired,
};

const Wrapper = styled.main`
  background: var(--secondary-color);
  padding: 40px 5px;
  color: var(--light-color);
  .w-960 {
    h1 {
      font-size: 2em;
      letter-spacing: 2px;
      font-weight: 300;
    }
  }
`;

export default Hero;

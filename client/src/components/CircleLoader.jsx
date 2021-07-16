import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PropType from 'prop-types';

const spinTransition = {
  loop: Infinity,
  ease: 'linear',
  duration: 1,
};

const CircleLoader = ({ bgColor, wrapperH, spW, spH, cirW, cirH }) => (
  <Wrapper style={{ height: wrapperH, backgroundColor: bgColor }}>
    <div className="spinner" style={{ width: spW, height: spH }}>
      <motion.span
        style={{ width: cirW, height: cirH }}
        className="circle"
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  display: grid;
  place-items: center;

  .spinner {
    position: relative;

    .circle {
      display: block;
      border: 4px solid #e3e3e3;
      border-top: 4px solid #3490d9;
      border-radius: 50%;
      position: absolute;
      box-sizing: border-box;
      left: 0;
      right: 0;
    }
  }
`;

CircleLoader.propTypes = {
  bgColor: PropType.string,
  wrapperH: PropType.string,
  spW: PropType.string,
  spH: PropType.string,
  cirW: PropType.string,
  cirH: PropType.string,
};

CircleLoader.defaultProps = {
  bgColor: 'transparent',
  wrapperH: 'auto',
  spW: '20px',
  spH: '20px',
  cirW: '20px',
  cirH: '20px',
};

export default CircleLoader;

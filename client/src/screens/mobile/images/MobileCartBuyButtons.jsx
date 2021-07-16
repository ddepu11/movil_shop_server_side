import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FiShoppingCart } from 'react-icons/fi';
import { AiTwotoneThunderbolt } from 'react-icons/ai';
import Button from '../../../components/Button';
import MobileCartBuyButtonsLogic from './logic/MobileCartBuyButtonsLogic';

const MobileCartBuyButtons = ({ color }) => {
  const { handleAddToCart } = MobileCartBuyButtonsLogic(color);

  return (
    <Wrapper className="flex">
      <Button
        bgColor="#e49c00"
        color="#ffffff"
        pt="15px"
        pb="15px"
        pr="30px"
        pl="30px"
        mr="15px"
        fs="1em"
        handleClick={handleAddToCart}
      >
        <div className="flex">
          <FiShoppingCart fontSize="1.15em" />
          <span>Add to Cart</span>
        </div>
      </Button>

      <Button
        bgColor="#f14c00"
        color="#fff7f7"
        pt="15px"
        pb="15px"
        pr="30px"
        pl="30px"
        fs="1em"
      >
        <div className="flex">
          <AiTwotoneThunderbolt fontSize="1.15em" />
          <span>Buy Now</span>
        </div>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  padding: 30px 0 0;

  div {
    span {
      text-transform: uppercase;
      margin-left: 10px;
      font-weight: bold;
      letter-spacing: 0.9px;
    }
  }
`;

MobileCartBuyButtons.propTypes = {
  color: PropTypes.string.isRequired,
};

export default MobileCartBuyButtons;

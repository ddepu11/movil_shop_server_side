import React from 'react';
import styled from 'styled-components';
import { AiOutlineShoppingCart, AiFillSetting } from 'react-icons/ai';
import { FiRefreshCcw } from 'react-icons/fi';

const Services = () => (
  <Wrapper className="w-960">
    <h1>Company Services</h1>
    <div className="flex service_div">
      <div className="service">
        <div className="s_logo">
          <AiOutlineShoppingCart />
        </div>
        <h1>Fast Delivery</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aperiam?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aperiam?
        </p>
      </div>
      <div className="service">
        <div className="s_logo">
          <AiFillSetting />
        </div>
        <h1>24*7 Customer Support</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aperiam?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aperiam?
        </p>
      </div>
      <div className="service">
        <div className="s_logo">
          <FiRefreshCcw />
        </div>
        <h1>Easy Returns</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aperiam?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aperiam?
        </p>
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.section`
  text-align: center;
  padding: 10px 0 40px;

  h1 {
    padding: 10px;
    font-size: 2.5em;
    letter-spacing: 2px;
    margin-bottom: 60px;
  }

  .service_div {
    flex-wrap: wrap;
    gap: 5rem;
  }

  .service {
    width: 250px;
    padding: 70px 20px;
    position: relative;
    border-radius: 5px;
    background: var(--primary-color);

    .s_logo {
      position: absolute;
      top: -40px;
      left: 0;
      transform: translateX(80px);
      width: 80px;
      height: 80px;
      background: var(--secondary-color);
      color: var(--light-color);
      border-radius: 50%;
      display: grid;
      place-content: center;
      font-size: 2em;
    }

    h1 {
      font-size: 1.5em;
      letter-spacing: 2px;
      margin-bottom: 10px;
      color: var(--light-color);
    }
    p {
      color: var(--light-color);
    }
  }
`;

export default Services;

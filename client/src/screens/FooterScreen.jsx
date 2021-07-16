import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const FooterScreen = () => (
  <Wrapper>
    <div className="f_upper flex">
      <div className="left flex">
        <div className="c">
          <h2>Getting Started</h2>
          <h3>Start Your Campaign</h3>
          <h3>Compaign Guidlines</h3>
          <h3>NPO Registration</h3>
        </div>

        <div className="c">
          <h2>Resources</h2>
          <h3>Spread the Word</h3>
          <h3>Support center</h3>
          <h3>FAQ</h3>
        </div>

        <div className="c">
          <h2>About</h2>
          <h3>Our Ethos</h3>
          <h3>How It Works</h3>
          <h3>Pricing</h3>
        </div>

        <div className="c">
          <h2>Connect Us</h2>
          <h3>Twitter</h3>
          <h3>Instagram</h3>
          <h3>NPO Registration</h3>
        </div>
      </div>

      <div className="right">
        <label htmlFor="news_letter">Join our news letter</label>
        <input id="news_letter" type="email" placeholder="Enter your email" />
        <Button
          pt="10px"
          pb="10px"
          pl="20px"
          pr="20px"
          bgColor="var(--tertiary-color)"
          fs="1.2em"
          color="#e0e0e0"
          bSh=""
        >
          Join
        </Button>
      </div>
    </div>

    <div className="f_bottom">
      <div className="f_lover flex">
        <div className="left">
          <p>
            &copy;{new Date().getFullYear()} MovilShop LTD - Proud Supporter of
            Humenkindness{' '}
          </p>
        </div>

        <div className="right">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Security</span>
        </div>
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.footer`
  background-color: var(--primary-color);

  .f_upper {
    justify-content: space-around;
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 10px;

    .left {
      width: 60%;
      margin: 0 auto;
      justify-content: space-between;

      .c {
        h2 {
          margin-bottom: 14px;
          color: var(--dark-color);
        }

        h3 {
          margin-bottom: 8px;
          color: var(--dark-color);
          font-weight: 500;
        }
      }
    }

    .right {
      justify-self: start;

      label {
        display: block;
        font-size: 1em;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--dark-color);
        padding: 5px 0;
      }

      input {
        padding: 10px 20px;
        font-size: 1.2em;
        color: #333;
      }
    }
  }

  .f_bottom {
    background-color: var(--secondary-color);
    padding: 20px 10px;
  }

  .f_lover {
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    color: white;

    .left {
      p {
        font-size: 1.1em;
        letter-spacing: 1px;
      }
    }

    .right {
      span {
        margin-left: 15px;
        font-size: 1em;
      }
    }
  }
`;

export default FooterScreen;

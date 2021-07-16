import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MobileAvgStarsScreen from './star/MobileAvgStarsScreen';
import MobileSubmitReviewScreen from './star/MobileSubmitReviewScreen';
import Button from '../../components/Button';
import formatePrice from '../../utils/formatePrice';

const MobileInfoScreen = ({ setColor, color }) => {
  const {
    mobile: {
      title,
      price,
      os,
      brand,
      internalMemory,
      ram,
      camera,
      battery,
      processor,
      colors,
      sellerInfo,
    },
  } = useSelector((state) => state.mobile);

  return (
    <Wrapper>
      <div className="head flex">
        <h1>{title}</h1>

        <MobileAvgStarsScreen />
      </div>

      <span className="price"> {formatePrice(price)} </span>

      <div className="specification flex">
        <h1>Specifications:</h1>

        <div className="spec flex">
          <h5>Operating System:</h5>
          <span>{os}</span>
        </div>

        <div className="spec flex">
          <h5>Brand:</h5>
          <span>{brand}</span>
        </div>

        <div className="spec flex">
          <h5>Internal Memory:</h5>
          <span>{internalMemory} GB</span>
        </div>

        <div className="spec flex">
          <h5>Ram:</h5>
          <span>{ram} GB</span>
        </div>

        <div className="spec flex">
          <h5>Camera:</h5>
          <span>{camera} MP</span>
        </div>

        <div className="spec flex">
          <h5>Processor:</h5>
          <span>{processor} GHz</span>
        </div>

        <div className="spec flex">
          <h5>Battery:</h5>
          <span>{battery} Mah</span>
        </div>

        <div className="spec colors flex">
          <h5>Available Colors:</h5>
          <div>
            {colors &&
              colors.map((c) => (
                <Button
                  key={c}
                  bgColor={c}
                  width="20px"
                  height="20px"
                  mr="6px"
                  mb="10px"
                  borderRadius="50%"
                  bSh="rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
                  handleClick={() => setColor(c.toString())}
                  color={c === 'white' || c === '#FFD700' ? 'black' : 'white'}
                >
                  {color === c ? '✓' : ''}
                </Button>
              ))}
          </div>
        </div>

        {sellerInfo && (
          <div className="spec sold_by flex">
            <h5>Sold By:</h5>
            <span>
              {sellerInfo.name} {sellerInfo.email}
            </span>
          </div>
        )}
      </div>

      <MobileSubmitReviewScreen />
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  padding: 0 60px;

  .head {
    flex-direction: column;
    align-items: flex-start;

    h1 {
      font-size: 2em;
      letter-spacing: 2px;
      color: #424242;
      margin-bottom: 5px;
    }
  }

  .price {
    color: #313131;
    font-size: 2em;
  }

  .specification {
    margin-top: 50px;
    flex-direction: column;
    align-items: flex-start;

    h1 {
      font-size: 1.3em;
      letter-spacing: 2px;
      color: #222;
      margin-bottom: 22px;
    }

    .spec {
      width: 65%;
      margin-bottom: 15px;
      justify-content: space-between;
      /* border: 1px solid red; */

      h5 {
        font-size: 1em;
        color: #646464;
        letter-spacing: 1px;
      }

      span {
        font-weight: bold;
        color: #505050;
        width: 30%;
        letter-spacing: 1px;
      }
    }

    .colors {
      padding: 8px 0;
      width: 75%;

      h5 {
        align-self: flex-start;
      }

      div {
        width: 40%;
      }
    }

    .sold_by {
      border-top: 1px dashed var(--primary-color);
      width: 88%;
      margin-top: 4px;
      padding-top: 10px;

      h5 {
        align-self: flex-start;
      }
      span {
        width: 50%;
      }
    }
  }
`;

MobileInfoScreen.propTypes = {
  setColor: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default MobileInfoScreen;

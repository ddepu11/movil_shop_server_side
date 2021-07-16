import React from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import styled from 'styled-components';
import Button from '../../../components/Button';
import MobileSubmitReviewScreenLogic from './logic/MobileSubmitReviewScreenLogic';

const MobileSubmitReviewScreen = () => {
  const {
    handleUpdateReview,
    handleCancelSubmitReview,
    alreadyReviewed,
    handleReviewSubmit,
    increaseStar,
    decreaseStar,
    stars,
  } = MobileSubmitReviewScreenLogic();

  return (
    <Wrapper className="give_review_section">
      {alreadyReviewed ? <h2>Your Review: </h2> : <h2>Give Review:</h2>}

      <div className="stars">
        {Array.from({ length: 5 }, (_, index) => {
          if (stars >= index + 1) {
            return <BsStarFill key={index} onClick={() => decreaseStar()} />;
          }

          return <BsStar key={index} onClick={() => increaseStar(index + 1)} />;
        })}
      </div>

      <div className="buttons flex">
        {stars > 0 && !alreadyReviewed && (
          <>
            <Button
              handleClick={handleReviewSubmit}
              bgColor="var(--secondary-color)"
              mt="12px"
              pt="10px"
              pb="10px"
              pl="16px"
              pr="16px"
              fs="1.1em"
              width="100%"
            >
              Submit Review
            </Button>
            <Button
              handleClick={handleCancelSubmitReview}
              bgColor="var(--danger-color)"
              mt="12px"
              pt="10px"
              pb="10px"
              pl="16px"
              pr="16px"
              fs="1.1em"
              width="100%"
            >
              Cancel
            </Button>
          </>
        )}

        {alreadyReviewed && (
          <Button
            handleClick={handleUpdateReview}
            bgColor="var(--success-color)"
            mt="15px"
            pt="10px"
            pb="10px"
            pl="16px"
            pr="16px"
            fs="1.1em"
            width="100%"
          >
            Update Review
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  margin-top: 8px;

  h2 {
    padding: 5px 0 0;
    color: var(--little-dark-color);
    letter-spacing: 1px;
    font-size: 1.3em;
  }

  .stars {
    padding: 12px 0 0;
    cursor: pointer;
    font-size: 1.3em;
    color: #d1bd03;
  }
  .stars > * {
    margin-right: 5px;
  }

  .buttons {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default MobileSubmitReviewScreen;

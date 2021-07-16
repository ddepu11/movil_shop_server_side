import React from 'react';
import styled from 'styled-components';
import { ImCancelCircle } from 'react-icons/im';
import Button from '../../components/Button';
import AsideScreenLogic from './logic/AsideScreenLogic';

const AsideScreen = () => {
  const {
    firstName,
    lastName,
    cancelChangeDPProcess,
    changeDP,
    initiateChangeDPProcess,
    wannaChangeDP,
    dpSRC,
  } = AsideScreenLogic();

  return (
    <Wrapper className="flex">
      <div className="dp">
        <img src={dpSRC.preview} alt={`${firstName} ${lastName}`} />

        <div className="change_dp_div flex">
          <label htmlFor="change_dp">Change DP</label>

          <input
            type="file"
            name="newDP"
            id="change_dp"
            accept=".jpg, .jpeg, .png"
            onChange={initiateChangeDPProcess}
          />

          {wannaChangeDP && (
            <>
              <Button
                pt="5px"
                pb="5px"
                pl="10px"
                pr="10px"
                handleClick={changeDP}
                width="100%"
                color="var(--dark-color)"
                bgColor="var(--success-color)"
                tr=""
                bSh=""
              >
                Upload
              </Button>

              <Button
                pt="5px"
                pb="5px"
                pl="10px"
                pr="10px"
                color="var(--light-color)"
                bgColor="var(--danger-color)"
                width="100%"
                type="button"
                handleClick={cancelChangeDPProcess}
                className="flex"
                fs="1.05em"
                tr=""
                bSh=""
              >
                Cancel Upload <ImCancelCircle />
              </Button>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  grid-area: as;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  z-index: 0;
  padding: 15px 0;

  .dp {
    width: 180px;
    height: 180px;
    position: relative;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      box-shadow: -5px 6px 8px 1px #252525;
      transition: transform 0.6s cubic-bezier(0.65, 0.05, 0.36, 1);
    }

    img:hover {
      cursor: pointer;
      transform: scale(1.6);
    }

    .change_dp_div {
      margin-top: 20px;
      text-align: center;
      flex-direction: column;
      gap: 8px 0;

      label {
        font-size: 1em;
        padding: 5px 10px;
        background: var(--tertiary-color);
        border-radius: 2px;
        color: white;
        width: 100%;
      }

      label,
      .cancel_upload_btn,
      .upload_btn {
        transition: transform 0.5s ease;
      }

      label:hover,
      .cancel_upload_btn:hover,
      .upload_btn:hover {
        transform: scale(1.15);
        cursor: pointer;
      }

      input {
        display: none;
      }
    }
  }

  .dp::before {
    content: '';
    background: var(--tertiary-color);
    width: 100%;
    height: 100%;
    position: absolute;
    top: -10px;
    left: 12px;
    z-index: -1;
    box-shadow: 5px -2px 8px #252525;
  }

  .dp::after {
    font-family: 'Font Awesome 5 Free';
    content: '\f083';
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--tertiary-color);
    position: absolute;
    top: 0;
    left: -20px;
    color: white;
    font-size: 1.1em;
    font-weight: bold;
    display: grid;
    place-content: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

export default AsideScreen;

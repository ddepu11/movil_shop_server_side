import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import UserDefaultPic from '../../assests/user.png';

const HeaderScreen = () => {
  const { userInfo } = useSelector((state) => state.user);

  const { displayPicture, firstName, lastName, email, userLoading } = userInfo;

  if (userLoading) {
    <Loading />;
  }

  return (
    <Wrapper className="flex card">
      <div className="dp">
        <img
          src={displayPicture ? `/dp/${displayPicture}` : UserDefaultPic}
          alt={firstName}
        />
      </div>

      <div className="info flex">
        <p>
          {firstName} {lastName}
        </p>
        <span>{email}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  grid-area: h;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 0 10px;

  button {
    transition: transform 0.5s ease;
  }

  button:hover {
    transform: scale(1.1);
  }

  .dp {
    width: 180px;
    height: 180px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: #23b9ff8e 10px 5px 80px 20px;
      transition: transform 1s ease-out;
    }

    img:hover {
      transform: scale(1.3);
    }

    position: relative;
  }

  .dp::before {
    content: '';
    position: absolute;
    z-index: -1;
    height: 103%;
    width: 103%;
    top: -2px;
    left: -2px;
    border-radius: 50%;
    background-image: linear-gradient(
      to right,
      var(--tertiary-color) 0%,
      var(--primary-color) 100%
    );
    animation: round 3s linear 2s infinite;
  }

  @keyframes round {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.07);
    }

    100% {
      transform: scale(1);
    }
  }

  .info {
    padding: 10px 0;
    flex-direction: column;
    width: 100%;
    p {
      margin-top: 14px;
      font-size: 1.6em;
      letter-spacing: 6px;
      color: #444;
      font-weight: bold;
      text-transform: uppercase;
    }

    span {
      padding: 8px 0 0;
      font-size: 1em;
      color: #444;
    }
  }
`;

export default HeaderScreen;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ImBin2 } from 'react-icons/im';
import { FcSearch } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import Button from './Button';
import FormFieldUpdate from './FormFieldUpdate';
import validateMobileForm from '../utils/validateMobileForm';
import clearAllSetTimeOut from '../utils/clearAllSetTimeOut';
import { updateSellerMobile } from '../actions/sellerActions';
import { sendNotification } from '../actions/notificationActions';
import formatePrice from '../utils/formatePrice';

const Mobile = ({
  pictures,
  title,
  os,
  internalMemory,
  ram,
  camera,
  processor,
  battery,
  price,
  userId,
  brand,
  colors,
  mobileId,
  handleDeleteMobile,
  usedFor,
  sellerName,
}) => {
  const dispatch = useDispatch();

  const setTimeOutId = useRef();

  useEffect(() => () => clearAllSetTimeOut(setTimeOutId), []);

  const [mobileInfo, setMobileInfo] = useState({
    title,
    brand,
    os,
    internalMemory,
    ram,
    camera,
    processor,
    battery,
    price,
  });

  const [wannaEdit, setWannaEdit] = useState(false);

  const initiateUpdateProcess = () => {
    setWannaEdit(true);
  };

  // Reference to diff message paragraph
  const titleMessageRefTag = useRef(null);
  const brandMessageRefTag = useRef(null);
  const osMessageRefTag = useRef(null);
  const internalMemoryMessageRefTag = useRef(null);
  const ramMessageRefTag = useRef(null);
  const cameraMessageRefTag = useRef(null);
  const processorMessageRefTag = useRef(null);
  const batteryMessageRefTag = useRef(null);
  const priceMessageRefTag = useRef(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMobileInfo({ ...mobileInfo, [name]: value });
  };

  const updateInfo = () => {
    const errorFlag = validateMobileForm(mobileInfo, setTimeOutId, {
      titleMessageRefTag,
      priceMessageRefTag,
      brandMessageRefTag,
      internalMemoryMessageRefTag,
      ramMessageRefTag,
      osMessageRefTag,
      batteryMessageRefTag,
      processorMessageRefTag,
      cameraMessageRefTag,
    });

    if (
      !errorFlag &&
      mobileInfo.title === title &&
      mobileInfo.brand === brand &&
      mobileInfo.os === os &&
      mobileInfo.internalMemory === internalMemory &&
      mobileInfo.ram === ram &&
      mobileInfo.processor === processor &&
      mobileInfo.camera === camera &&
      mobileInfo.battery === battery &&
      mobileInfo.price === price
    ) {
      dispatch(sendNotification('Sorry There is notingh to update!', true));
    } else if (!errorFlag) {
      dispatch(updateSellerMobile(mobileInfo, mobileId));
      setWannaEdit(false);
    }
  };

  const cancelUpdate = () => {
    setWannaEdit(false);

    setMobileInfo({
      title,
      brand,
      os,
      internalMemory,
      ram,
      camera,
      processor,
      battery,
      price,
    });
  };

  if (wannaEdit) {
    return (
      <Wrapper1 className="w-960">
        <h1 className="heading">Update {title} Info </h1>
        <FormFieldUpdate
          heading="Title"
          wannaEdit={wannaEdit}
          inputValue={mobileInfo.title}
          type="text"
          inputName="title"
          handleInput={handleInput}
          refObj={titleMessageRefTag}
        />

        <FormFieldUpdate
          heading="Price"
          wannaEdit={wannaEdit}
          inputValue={mobileInfo.price}
          type="number"
          inputName="price"
          handleInput={handleInput}
          refObj={priceMessageRefTag}
        />

        <FormFieldUpdate
          heading="Brand"
          wannaEdit={wannaEdit}
          inputValue={mobileInfo.brand}
          type="text"
          inputName="brand"
          handleInput={handleInput}
          refObj={brandMessageRefTag}
        />

        <FormFieldUpdate
          heading="Operating System"
          wannaEdit={wannaEdit}
          inputValue={mobileInfo.os}
          type="text"
          inputName="os"
          handleInput={handleInput}
          refObj={osMessageRefTag}
        />

        <FormFieldUpdate
          heading="Internal Memory (GB)"
          wannaEdit={wannaEdit}
          inputValue={mobileInfo.internalMemory}
          type="number"
          inputName="internalMemory"
          handleInput={handleInput}
          refObj={internalMemoryMessageRefTag}
        />

        <FormFieldUpdate
          heading="Ram (GB)"
          wannaEdit={wannaEdit}
          inputValue={mobileInfo.ram}
          type="number"
          inputName="ram"
          handleInput={handleInput}
          refObj={ramMessageRefTag}
        />

        <FormFieldUpdate
          heading="Camera (MP)"
          wannaEdit={wannaEdit}
          inputValue={mobileInfo.camera}
          type="number"
          inputName="camera"
          handleInput={handleInput}
          refObj={cameraMessageRefTag}
        />

        <FormFieldUpdate
          heading="Processor (GHz)"
          wannaEdit={wannaEdit}
          inputValue={mobileInfo.processor}
          type="number"
          inputName="processor"
          handleInput={handleInput}
          refObj={processorMessageRefTag}
        />

        <FormFieldUpdate
          heading="Battery"
          wannaEdit={wannaEdit}
          inputValue={mobileInfo.battery}
          type="number"
          inputName="battery"
          handleInput={handleInput}
          refObj={batteryMessageRefTag}
        />

        <div className="update_cancel_btn flex">
          <Button
            pt="8px"
            pb="8px"
            pl="16px"
            pr="16px"
            mr="10px"
            handleClick={updateInfo}
            bgColor="var(--success-color)"
            fs="0.8em"
          >
            Update!!!
          </Button>

          <Button
            pt="8px"
            pb="8px"
            pl="16px"
            pr="16px"
            mr="10px"
            fs="0.8em"
            handleClick={cancelUpdate}
            bgColor="var(--danger-color)"
          >
            Cancel
          </Button>
        </div>
      </Wrapper1>
    );
  }

  if (usedFor === 'list') {
    return (
      <ListView className="flex">
        <div className="mobile_pic">
          <img src={`/sellers/${userId}/${pictures[0]}`} alt={title} />
        </div>

        <div className="info flex">
          <h2>{title}</h2>

          <p>Price: {formatePrice(price)}</p>
          <span>Soled by: {sellerName}</span>

          <Link to={`/mobiles/${mobileId}`}>
            <div className="flex">
              <FcSearch className="search" fontSize="1.3em" />
              <span>More Details</span>
            </div>
          </Link>
        </div>
      </ListView>
    );
  }

  if (usedFor === 'grid') {
    return (
      <GridView>
        <div className="mobile_pic">
          <img src={`/sellers/${userId}/${pictures[0]}`} alt={title} />
        </div>

        <div className="info">
          <h2>{title}</h2>
          <span>{formatePrice(price)}</span>
        </div>

        <div className="cover">
          <Link to={`/mobiles/${mobileId}`}>
            <FcSearch className="search" fontSize="3.2em" />
          </Link>
        </div>
      </GridView>
    );
  }

  return (
    <Wrapper0 className="flex">
      <div className="mobile_pic">
        <img src={`/sellers/${userId}/${pictures[0]}`} alt={title} />
      </div>

      <div className="mobile_info flex">
        <div className="left">
          <div>
            <h1>{title}</h1>
          </div>
          <ul>
            <li>- &nbsp;&nbsp;{brand}</li>
            <li>- &nbsp;&nbsp;{os} operating system</li>
            <li>- &nbsp;&nbsp;{internalMemory}GB Internal Storage</li>
            <li>- &nbsp;&nbsp;{ram}GB Ram</li>
            <li>- &nbsp;&nbsp;{camera} MP Camera</li>
            <li>- &nbsp;&nbsp;{processor} GHz Processor</li>
            <li>- &nbsp;&nbsp;{battery}Mah Battery</li>
          </ul>
        </div>

        <div className="middle">
          {/* Buttons */}
          {!wannaEdit && (
            <Button
              pt="5px"
              pb="5px"
              pl="10px"
              pr="10px"
              bgColor="var(--tertiary-color)"
              color="white"
              handleClick={initiateUpdateProcess}
              bSh="rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
              fs="0.8em"
            >
              Initiate Mobile Update
            </Button>
          )}
        </div>

        <div className="right">
          <h1>{formatePrice(price)}</h1>

          <div className="color_btns flex">
            {colors.map((c) => (
              <Button
                key={c}
                pt="0px"
                pb="0px"
                pl="0px"
                pr="0px"
                mb="15px"
                borderRadius="50%"
                bgColor={c}
                width="18px"
                height="18px"
                bSh=" rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
                fs="0.8em"
              >
                {' '}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Button */}
      {usedFor === 'seller' && (
        <Button
          pt="0px"
          pb="0px"
          pl="0px"
          pr="0px"
          borderRadius="50%"
          bgColor="tranparent"
          width="22px"
          height="22px"
          color="var(--danger-color)"
          mr="20px"
          bSh=""
          handleClick={() => handleDeleteMobile(mobileId)}
          fs="1.1em"
          positionVal="absolute"
          fromBottom="5px"
          fromRight="0"
        >
          <ImBin2 />
        </Button>
      )}
    </Wrapper0>
  );
};

const ListView = styled.div`
  padding: 12px 0;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 80%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .mobile_pic {
    width: 180px;
    height: 180px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .info {
    flex-direction: column;
    align-items: flex-start;

    h2 {
      font-size: 1.3em;
      color: #222;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    p,
    span {
      color: #333;
      margin-bottom: 5px;
    }
  }
`;

const GridView = styled.div`
  width: 150px;
  position: relative;
  padding: 10px 2px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

  .mobile_pic {
    height: 155px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .info {
    margin-top: 10px;
    text-align: center;

    h2 {
      font-size: 0.8em;
      color: #333;
      margin-bottom: 5px;
      letter-spacing: 1px;
    }
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #aebbd4;
    opacity: 0;
    display: grid;
    place-items: center;
    border-radius: 5px;
    transition: all 0.5s ease;
  }

  .cover:hover {
    opacity: 0.7;
    .search {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const Wrapper1 = styled.div`
  width: 70%;

  .heading {
    font-size: 1.2em;
  }

  .update_cancel_btn {
    padding: 0px 0 20px;
  }
`;

const Wrapper0 = styled.div`
  padding: 10px 20px;
  justify-content: space-between;
  gap: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  margin-bottom: 15px;
  position: relative;

  .mobile_pic {
    width: 170px;
    height: 208px;

    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
      border-radius: 5px;
    }
  }

  .mobile_info {
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    padding: 0px 0px 0 25px;

    .left {
      h1 {
        font-size: 1.5em;
        letter-spacing: 2px;
        color: #333;
      }

      ul {
        padding: 12px 0 0;
        li {
          padding: 0 0 8px;
          color: #444;
          letter-spacing: 1px;
        }
      }
    }

    .middle {
      justify-self: end;
    }

    .right {
      align-self: flex-start;
      color: #444;
      letter-spacing: 1.1px;
      font-size: 1.2em;

      .color_btns {
        margin-top: 20px;
        justify-content: space-between;
        flex-direction: column;
      }
    }
  }
`;

Mobile.propTypes = {
  pictures: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  os: PropTypes.string,
  internalMemory: PropTypes.number,
  ram: PropTypes.string,
  camera: PropTypes.string,
  processor: PropTypes.string,
  battery: PropTypes.string,
  price: PropTypes.number,
  userId: PropTypes.string,
  brand: PropTypes.string,
  colors: PropTypes.array,
  mobileId: PropTypes.string,
  handleDeleteMobile: PropTypes.func,
  usedFor: PropTypes.string.isRequired,
  sellerName: PropTypes.string,
};

Mobile.defaultProps = {
  mobileId: '234857asd87s8d',
  sellerName: 'xyz',
  brand: 'mno',
  os: 'mno',
  processor: '1.2',
  internalMemory: 16,
  camera: '24',
  battery: '5000',
  price: '15000',
  ram: '8',
  colors: [],
  userId: '15748sdj',
  handleDeleteMobile: () => {},
};

export default Mobile;

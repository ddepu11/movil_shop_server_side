import React from 'react';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import Mobile from '../../components/Mobile';
import AllMobilesScreenLogic from './logic/AllMobilesScreenLogic';

const AllMobileScreen = () => {
  const { handleDeleteMobile, sellerLoading, userInfo, sellerMobiles } =
    AllMobilesScreenLogic();

  if (sellerLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <h1 className="heading">All the mobiles you have added</h1>
      <section className="mobiles">
        {sellerMobiles.length !== 0 &&
          sellerMobiles.map((item) => {
            const {
              pictures,
              title,
              price,
              os,
              internalMemory,
              processor,
              battery,
              camera,
              ram,
              brand,
              _id,
              colors,
            } = item;

            return (
              <Mobile
                key={_id}
                pictures={pictures}
                ram={ram}
                camera={camera}
                title={title}
                price={price}
                os={os}
                processor={processor}
                battery={battery}
                internalMemory={internalMemory}
                userId={userInfo._id}
                brand={brand}
                colors={colors}
                mobileId={_id}
                handleDeleteMobile={handleDeleteMobile}
                handlingUpdate={1}
                usedFor="seller"
              />
            );
          })}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .heading {
    font-size: 1.1em;
    color: #444;
    text-align: center;
    letter-spacing: 1.4px;
    padding: 2px 0 35px;
  }
`;

export default AllMobileScreen;

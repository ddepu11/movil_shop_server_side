import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../../components/Loading';
import Mobile from '../../../components/Mobile';

const GridViewScreen = () => {
  const { filteredMobile } = useSelector((state) => state.filterMobile);
  const { mobileLoading } = useSelector((state) => state.mobile);

  if (mobileLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      {filteredMobile.map((mobile) => {
        const {
          _id,
          pictures,
          ram,
          camera,
          title,
          price,
          os,
          processor,
          battery,
          internalMemory,
          brand,
          colors,
          sellerInfo: { id },
        } = mobile;

        return (
          <Mobile
            key={_id}
            mobileId={_id}
            pictures={pictures}
            ram={ram}
            camera={camera}
            title={title}
            price={price}
            os={os}
            processor={processor}
            battery={battery}
            internalMemory={internalMemory}
            userId={id}
            brand={brand}
            colors={colors}
            usedFor="grid"
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px 00px;
  padding: 15px 0px 0 15px;
`;

export default GridViewScreen;

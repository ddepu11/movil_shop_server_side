import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../../components/Loading';
import Mobile from '../../../components/Mobile';

const ListViewScreen = () => {
  const { filteredMobile } = useSelector((state) => state.filterMobile);
  const { mobileLoading } = useSelector((state) => state.mobile);

  if (mobileLoading) {
    return <Loading />;
  }

  return (
    <Wrapper className="flex">
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
          sellerInfo: { id, name },
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
            handlingUpdate={0}
            usedFor="list"
            sellerName={name}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  flex-direction: column;
  align-items: flex-start;
  gap: 25px 0;
  padding: 10px 0 0;
`;

export default ListViewScreen;

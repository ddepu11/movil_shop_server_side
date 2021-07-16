import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/Button';
import CircleLoader from '../../components/CircleLoader';
import formatePrice from '../../utils/formatePrice';

const OrdersScreen = () => {
  const { userInfo, userLoading } = useSelector((state) => state.user);
  // const history = useHistory();

  // useEffect(() => {
  //   if (
  //     Object.keys(userInfo).length !== 0 &&
  //     Object.keys(userInfo.orders).length === 0
  //   ) {
  //     history.push('');
  //   }
  // }, [userInfo, history]);

  if (userLoading) {
    return (
      <CircleLoader
        bgColor="var(--secondary-color)"
        wrapperH="80vh"
        spW="90px"
        spH="90px"
        cirW="90px"
        cirH="90px"
      />
    );
  }

  return (
    <Wrapper className="w-960">
      <h1>Your Orders</h1>

      <div className="orders">
        {Object.keys(userInfo).length !== 0 &&
          userInfo.orders.map((m) => {
            const {
              title,
              _id,
              picture,
              sellerId,
              sellerName,
              price,
              deliveredDate,
              color,
            } = m;

            return (
              <div key={_id} className="order flex">
                <div className="pic">
                  <img src={`/sellers/${sellerId}/${picture}`} alt={title} />
                </div>

                <div className="info">
                  <h2>{title}</h2>
                  <span>
                    Color:{' '}
                    <Button
                      width="25px"
                      height="25px"
                      ml="10px"
                      bgColor={color}
                      mb="10px"
                      mt="5px"
                      bSh="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                      borderRadius="50%"
                    >
                      &nbsp;
                    </Button>
                  </span>
                  <p>Seller: {sellerName}</p>
                </div>

                <h3 className="price">{formatePrice(price)}</h3>

                <h4>Delivered On: {new Date(deliveredDate).toDateString()}</h4>
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 10px;

  h1 {
    color: var(--little-dark-color);
    font-size: 2em;
    letter-spacing: 1px;
    text-align: center;
    padding: 15px 0;
  }

  .orders {
    padding: 15px 0;

    .order {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      justify-content: space-between;
      align-items: flex-start;
      padding: 18px 5px;
      margin-bottom: 20px;

      .pic {
        width: 180px;
        height: 180px;
        img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }
      color: var(--little-dark-color);

      .info {
        h2 {
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        p {
          margin-top: 10px;
        }
      }
      .price {
        letter-spacing: 1px;
      }
    }
  }
`;

export default OrdersScreen;

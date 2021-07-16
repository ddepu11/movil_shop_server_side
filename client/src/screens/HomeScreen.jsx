import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import HeroImg from '../assests/home_hero_img.jpg';
import Services from '../components/Services';
import { isUserRegisteredWithThisEmail } from '../actions/userActions';
import Mobile from '../components/Mobile';

const Home = () => {
  const { user, isAuthenticated } = useAuth0();

  const { hasUserLoggedIn } = useSelector((state) => state.user);
  const { mobiles } = useSelector((state) => state.mobile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && !hasUserLoggedIn) {
      dispatch(isUserRegisteredWithThisEmail(user.email));
    }
  }, [user, dispatch, isAuthenticated, hasUserLoggedIn]);

  return (
    <Wrapper>
      <div className="header">
        <section className="flex w-960">
          <aside>
            <h2>MovilShop Number#1 Trusted Mobile Website.</h2>

            <p>Comming soon in your door with huge discount</p>

            <Link className="link_btn shop_now_btn" to="/mobiles">
              Shop Now
            </Link>
          </aside>

          <img src={HeroImg} alt="" />
        </section>
      </div>

      <div className="recent-mobiles">
        <h2 className="heading">Recent Products</h2>
        <div className="mobiles flex">
          {mobiles.length !== 0 &&
            mobiles
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((mobile, index) => {
                const {
                  _id,
                  pictures,
                  title,
                  price,
                  sellerInfo: { id },
                } = mobile;

                if (index < 5) {
                  return (
                    <Mobile
                      pictures={pictures}
                      title={title}
                      price={price}
                      usedFor="grid"
                      userId={id}
                      mobileId={_id}
                      key={_id}
                    />
                  );
                }

                return null;
              })}
        </div>

        <Link to="/mobiles" className="link_btn all_products_btn">
          All Mobiles
        </Link>
      </div>

      <Services />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .link_btn {
    background-color: var(--tertiary-color);
    padding: 10px 20px;
    color: white;
  }

  .header {
    max-width: 1200px;
    margin: 0 auto;
    background-color: var(--secondary-color);
    padding: 20px;
    transform: translateY(-35px);

    .flex {
      justify-content: space-between;

      aside {
        align-self: center;
        color: white;

        h2 {
          font-size: 2.2em;
          letter-spacing: 4px;
          line-height: 1.4;
          text-transform: uppercase;
        }

        p {
          font-size: 0.9em;
          margin-top: 20px;
          text-transform: capitalize;
        }

        .shop_now_btn {
          margin-top: 30px;
        }
      }

      img {
        width: 50%;
        height: 100%;
      }
    }
  }

  .recent-mobiles {
    background-color: var(--primary-color);
    padding: 20px;
    text-align: center;

    .heading {
      margin-bottom: 50px;
      font-size: 1.8em;
      letter-spacing: 2px;
    }

    .mobiles {
      flex-wrap: wrap;
      gap: 2rem 2.5rem;

      .mobile_pic {
        height: 180px;
      }
    }

    .all_products_btn {
      margin-top: 35px;
      background-color: var(--tertiary-color);
      border-radius: 5px;
      transition: transform 0.5s ease;
    }

    .all_products_btn:hover {
      transform: scale(1.1);
    }
  }
`;

export default Home;

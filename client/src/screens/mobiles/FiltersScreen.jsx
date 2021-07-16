import React from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import FilterScreenLogic from './logic/FilterScreenLogic';

const FiltersScreen = ({ handleButtons, handleInput, filters }) => {
  const { clearFilters, colors, ram, brands } = FilterScreenLogic();

  return (
    <Wrapper>
      <div className="filters_div">
        <form>
          <div className="form-control">
            <input
              type="text"
              onChange={handleInput}
              className="search"
              placeholder="search"
              name="search"
            />
          </div>

          <div className="form-control">
            <h5>Brand</h5>

            <select
              name="brand"
              id="brand"
              value={filters.brand}
              onChange={handleInput}
            >
              <option value="all">All</option>
              {brands &&
                brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-control">
            <h5>Customer Ratings</h5>
            <div className="custumer_rating_btns">
              <Button
                bgColor="transparent"
                color="#222"
                borderRadius="1px"
                bSh=""
                pb="5px"
                pt="5px"
                ml="10px"
                width="55%"
                handleClick={() => handleButtons('avgStar', '5')}
              >
                <div
                  className="flex"
                  style={{ justifyContent: 'space-between' }}
                >
                  <span>5</span>&nbsp; <AiFillStar />
                  <span>and above</span>
                </div>
              </Button>
              <Button
                bgColor="transparent"
                color="#222"
                borderRadius="1px"
                bSh=""
                pb="5px"
                pt="5px"
                ml="10px"
                width="55%"
                handleClick={() => handleButtons('avgStar', '4')}
              >
                <div
                  className="flex"
                  style={{ justifyContent: 'space-between' }}
                >
                  <span>4</span>&nbsp; <AiFillStar />
                  <span>and above</span>
                </div>
              </Button>
              <Button
                bgColor="transparent"
                color="#222"
                borderRadius="1px"
                bSh=""
                pb="5px"
                pt="5px"
                ml="10px"
                width="55%"
                handleClick={() => handleButtons('avgStar', '3')}
              >
                <div
                  className="flex"
                  style={{ justifyContent: 'space-between' }}
                >
                  <span>3</span>&nbsp; <AiFillStar />
                  <span>and above</span>
                </div>
              </Button>
              <Button
                bgColor="transparent"
                color="#222"
                borderRadius="1px"
                bSh=""
                pb="5px"
                pt="5px"
                ml="10px"
                width="55%"
                handleClick={() => handleButtons('avgStar', '2')}
              >
                <div
                  className="flex"
                  style={{ justifyContent: 'space-between' }}
                >
                  <span>2</span>&nbsp; <AiFillStar />
                  <span>and above</span>
                </div>
              </Button>
              <Button
                bgColor="transparent"
                color="#222"
                borderRadius="1px"
                bSh=""
                pb="5px"
                pt="5px"
                ml="10px"
                width="55%"
                handleClick={() => handleButtons('avgStar', '1')}
              >
                <div
                  className="flex"
                  style={{ justifyContent: 'space-between' }}
                >
                  <span>1</span>&nbsp; <AiFillStar />
                  <span>and above</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="form-control">
            <h5>Price</h5>
            <input
              onChange={handleInput}
              className="price_input"
              type="range"
              min="0"
              max="150000"
              name="price"
            />
            <p>Range: 0 - {filters.price}</p>
          </div>

          <div className="form-control">
            <h5>Ram</h5>
            {ram &&
              ram.map((r) => (
                <div className="ram" key={r}>
                  <input
                    onChange={handleInput}
                    type="radio"
                    id={`${r}gb`}
                    name="ram"
                    value={r}
                    checked={filters.ram === r && true}
                  />
                  <label htmlFor={`${r}gb`}>{r}gb</label>
                </div>
              ))}
          </div>

          <div className="form-control">
            <h5>Color</h5>

            <div className="colors flex">
              <Button
                bgColor="transparent"
                color="#333"
                fs="1.2em"
                width="30px"
                height="30px"
                mr="10px"
                bSh=""
                borderRadius="50%"
                handleClick={() => handleButtons('color', 'all')}
              >
                {filters.color === 'all' ? (
                  <span
                    style={{
                      borderBottom: '2px solid black',
                    }}
                  >
                    All
                  </span>
                ) : (
                  <span>All</span>
                )}
              </Button>

              {colors &&
                colors.map((c) => (
                  <Button
                    key={c}
                    bgColor={c}
                    color={c === 'white' || c === '#FFD700' ? 'black' : 'white'}
                    fs="1.2em"
                    width="28px"
                    height="28px"
                    mr="5px"
                    bSh="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                    borderRadius="50%"
                    handleClick={() => handleButtons('color', c)}
                  >
                    {filters.color === c ? <span>&#10003;</span> : ''}
                  </Button>
                ))}
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="assured" className="assured">
              MovilShop Assured
            </label>
            <input
              type="checkbox"
              name="movilShopAssured"
              onChange={handleInput}
              id="assured"
            />
          </div>

          <Button
            bgColor="#fa0000e6"
            color="#f8f6f6"
            borderRadius="1px"
            fs="1.2em"
            pt="8px"
            pb="8px"
            pr="16px"
            pl="16px"
            mt="10px"
            width="100%"
            bSh="rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
            handleClick={clearFilters}
          >
            Clear Filter
          </Button>
        </form>
      </div>
    </Wrapper>
  );
};

FiltersScreen.propTypes = {
  handleButtons: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

const Wrapper = styled.aside`
  .filters_div {
    position: sticky;
    top: 1rem;

    .form-control {
      margin-bottom: 25px;

      .price_input {
        width: 100%;
      }

      h5 {
        font-size: 1.1em;
        margin-bottom: 10px;
        color: rgb(94, 94, 94);
        letter-spacing: 2px;
      }

      .search {
        font-size: 1.2em;
        padding: 5px 10px;
        border: 1px solid rgba(0, 0, 0, 0.35);
        color: #333;
        width: 100%;
      }

      select {
        font-size: 1.1em;
        border: 1px solid rgba(0, 0, 0, 0.35);
        padding: 3px 10px;
        width: 100%;
      }

      ul {
      }

      ul li {
        padding: 0px 5px 10px;
      }

      ul li button {
        font-size: 0.9em;
        background: transparent;
        color: #4d4d4d;
      }

      p {
        color: #474747;
        padding: 5px 0 0;
      }

      .ram {
        margin-bottom: 10px;
        padding: 0 0px 0 10px;
        input {
          margin-right: 8px;
        }
        label {
          color: #5a5a5a;
        }
      }

      .colors {
        justify-content: flex-start;

        .all_color {
          font-size: 1.1em;
          background: transparent;
          color: #383737;
          margin-right: 5px;
        }
      }

      .assured {
        display: inline;
        margin-right: 10px;
      }
    }

    .clear_filters {
      padding: 5px 10px;
      display: block;
      width: 50%;
      margin: 0 auto;
      font-size: 1.2em;
      margin-top: 30px;
      background: #222;
      color: white;
    }
  }
`;

export default FiltersScreen;

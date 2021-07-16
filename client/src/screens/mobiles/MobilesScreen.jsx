import React from 'react';
import styled from 'styled-components';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import FiltersScreen from './FiltersScreen';
import Hero from '../../components/Hero';
import GridViewScreen from './views/GridViewScreen';
import ListViewScreen from './views/ListViewScreen';

import MobileScreenLogic from './logic/MobileScreenLogic';

const MobilesScreen = () => {
  const { filteredMobile, handleInput, handleButtons, filters } =
    MobileScreenLogic();

  return (
    <>
      <Hero title="mobiles" />

      <Wrapper className="w-960">
        <FiltersScreen
          filters={filters}
          handleButtons={handleButtons}
          handleInput={handleInput}
        />

        <section className="display_products">
          <header className="header flex">
            <h2>{filteredMobile.length} mobiles found</h2>

            <div className="sort_by">
              <label htmlFor="sort">Sort By: </label>
              <select
                name="sortBy"
                id="sort"
                value={filters.sortBy}
                onChange={handleInput}
              >
                <option value="lowest">Price (lowest)</option>
                <option value="highest">Price (highest)</option>
                <option value="a-z">Name (A - Z)</option>
                <option value="z-a">Name (Z - A)</option>
              </select>
            </div>

            <div className="view_by flex">
              <span>View</span>

              <button
                type="button"
                onClick={() => handleButtons('view', 'grid')}
              >
                <BsGrid3X3Gap />
              </button>

              <button
                type="button"
                onClick={() => handleButtons('view', 'list')}
              >
                <AiOutlineUnorderedList />
              </button>
            </div>
          </header>

          {filters.view === 'grid' ? <GridViewScreen /> : <ListViewScreen />}
        </section>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  padding: 40px 6px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;

  .display_products {
    position: sticky;
    top: 5rem;
    .header {
      justify-content: space-between;
      margin-bottom: 20px;
      h2 {
        font-size: 1.2em;
        letter-spacing: 1px;
        text-transform: capitalize;
        font-weight: 500;
      }
      .sort_by {
        h2 {
          font-size: 1.1em;
        }
        select {
          padding: 5px 10px;
        }
      }

      .view_by {
        width: 15%;
        justify-content: space-between;

        span {
          font-size: 1.2em;
          padding: 0 0 5px;
        }

        button {
          background: transparent;
          font-size: 1.2em;
        }
      }
    }
  }
`;

export default MobilesScreen;

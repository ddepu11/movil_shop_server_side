import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  filterByBrand,
  filterByColor,
  filterByKeyword,
  filterByMovilShopAssured,
  filterByPrice,
  filterByRam,
  filterByStars,
  setFilters,
  sort,
} from '../../../actions/filterMobileActions';

const MobileScreenLogic = () => {
  const dispatch = useDispatch();

  const { filters, filteredMobile } = useSelector(
    (state) => state.filterMobile
  );

  useEffect(() => {
    dispatch(filterByKeyword());
  }, [filters.search, dispatch]);

  useEffect(() => {
    dispatch(sort());
  }, [filters.sortBy, dispatch]);

  useEffect(() => {
    dispatch(filterByBrand());
  }, [filters.brand, dispatch]);

  useEffect(() => {
    dispatch(filterByStars());
  }, [filters.avgStar, dispatch]);

  useEffect(() => {
    dispatch(filterByPrice());
  }, [filters.price, dispatch]);

  useEffect(() => {
    dispatch(filterByRam());
  }, [filters.ram, dispatch]);

  useEffect(() => {
    dispatch(filterByColor());
  }, [filters.color, dispatch]);

  useEffect(() => {
    dispatch(filterByMovilShopAssured());
  }, [filters.movilShopAssured, dispatch]);

  const handleButtons = (name, value) => {
    dispatch(setFilters({ name, value }));
  };

  const handleInput = (e) => {
    let { value } = e.target;
    const { name } = e.target;

    if (name === 'movilShopAssured') {
      value = !filters.movilShopAssured;

      dispatch(setFilters({ name, value }));
    } else {
      dispatch(setFilters({ name, value }));
    }
  };

  return { filteredMobile, handleInput, handleButtons, filters };
};

export default MobileScreenLogic;

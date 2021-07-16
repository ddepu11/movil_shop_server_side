import {
  FILTER_MOBILE_BY_BRAND,
  FILTER_MOBILE_BY_COLOR,
  FILTER_MOBILE_BY_KEYWORD,
  FILTER_MOBILE_BY_MOVILSHOP_ASSURED,
  FILTER_MOBILE_BY_PRICE,
  FILTER_MOBILE_BY_RAM,
  FILTER_MOBILE_BY_STAR,
  FILTER_MOBILE_CLEAR,
  FILTER_MOBILE_GET_ALL,
  FILTER_MOBILE_SET,
  FILTER_MOBILE_SORT,
} from '../constants/filterMobileConstants';

export const loadMobiles = (mobiles) => (dispatch) => {
  dispatch({
    type: FILTER_MOBILE_GET_ALL,
    payload: mobiles.sort((a, b) => a.price - b.price),
  });
};

export const setFilters =
  ({ name, value }) =>
  (dispatch) =>
    dispatch({ type: FILTER_MOBILE_SET, payload: { name, value } });

export const sort = () => (dispatch) => dispatch({ type: FILTER_MOBILE_SORT });

export const filterByKeyword = () => (dispatch) =>
  dispatch({ type: FILTER_MOBILE_BY_KEYWORD });

export const filterByBrand = () => (dispatch) =>
  dispatch({ type: FILTER_MOBILE_BY_BRAND });

export const filterByStars = () => (dispatch) =>
  dispatch({ type: FILTER_MOBILE_BY_STAR });

export const filterByPrice = () => (dispatch) =>
  dispatch({ type: FILTER_MOBILE_BY_PRICE });

export const filterByRam = () => (dispatch) =>
  dispatch({ type: FILTER_MOBILE_BY_RAM });

export const filterByColor = () => (dispatch) =>
  dispatch({ type: FILTER_MOBILE_BY_COLOR });

export const filterByMovilShopAssured = () => (dispatch) =>
  dispatch({ type: FILTER_MOBILE_BY_MOVILSHOP_ASSURED });

export const clearFilter = () => (dispatch) =>
  dispatch({ type: FILTER_MOBILE_CLEAR });

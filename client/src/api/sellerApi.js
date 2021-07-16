import axios from 'axios';

export const mobiles = (sellerId) =>
  axios.get(`/sellers/${sellerId}/mobiles/list`);

export const remove = (id) => axios.delete(`/sellers/mobiles/${id}`);

export const update = (mobileInfo, mobileId) =>
  axios.put(`/sellers/mobiles/${mobileId}`, mobileInfo);

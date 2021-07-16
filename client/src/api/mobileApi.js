import axios from 'axios';

export const create = (formData) =>
  axios.post('/mobiles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const listAll = () => axios.get('/mobiles');

export const getMobile = (id) => axios.get(`/mobiles/${id}`);

export const review = (id, stars) =>
  axios.post(`/mobiles/review`, { id, stars });

export const updateReview = (mobileId, stars, reviewId) =>
  axios.put(`/mobiles/review`, { mobileId, stars, reviewId });

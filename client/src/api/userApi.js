import axios from 'axios';

const authenticate = () => axios.get('/users/authenticate');

const logIn = (email, password) =>
  axios.post('/users/sign-in', { email, password });

// Signing up with credentials and an image
const signUp = (formData) =>
  axios.post('/users/sign-up', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const accountInfo = () => axios.get(`/users/account-info`);

const logOut = () => axios.get('/users/log-out');

const checkIsEmailRegistered = (email) =>
  axios.post('/users/exists', { email });

const update = (data, _id) => axios.put(`/users/${_id}`, data);

const changeDP = (formData, _id) =>
  axios.put(`/users/${_id}/dp`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const addToCart = (userId, mobile) =>
  axios.put(`/users/${userId}/cart`, mobile);

const increaseOrDecreaseCartItemQuantity = (userId, cartItemId, action) =>
  axios.put(`/users/${userId}/cart/item/${cartItemId}`, { action });

const deleteCartItem = (userId, cartItemId) =>
  axios.delete(`/users/${userId}/cart/item/${cartItemId}`);

const removeAllCartItems = (userId) =>
  axios.delete(`/users/${userId}/cart/items`);

const saveDeliveryAddress = (userId, deliveryAddress) =>
  axios.put(`/users/${userId}/deliveryAddress`, deliveryAddress);

const saveUserOrders = (userId, cart) =>
  axios.put(`/users/${userId}/orders`, cart);

export {
  logIn,
  signUp,
  accountInfo,
  logOut,
  checkIsEmailRegistered,
  authenticate,
  update,
  changeDP,
  addToCart,
  increaseOrDecreaseCartItemQuantity,
  deleteCartItem,
  removeAllCartItems,
  saveDeliveryAddress,
  saveUserOrders,
};

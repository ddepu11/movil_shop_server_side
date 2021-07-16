export const getLocalCart = () => JSON.parse(localStorage.getItem('cart'));

export const setLocalCart = (cart) =>
  localStorage.setItem('cart', JSON.stringify(cart));

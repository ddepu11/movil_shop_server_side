const clearAllSetTimeOut = (setTimeOutId) => {
  let id = setTimeOutId.current;

  while (id) {
    clearTimeout(id);
    id -= 1;
  }
};

export default clearAllSetTimeOut;

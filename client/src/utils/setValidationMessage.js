const setValidationMessage = (ref, message, className, setTimeOutId) => {
  ref.current.innerText = message;
  ref.current.classList.add(className);

  setTimeOutId.current = setTimeout(() => {
    ref.current.innerText = '';
    ref.current.classList.remove(className);
  }, 4000);
};

export default setValidationMessage;

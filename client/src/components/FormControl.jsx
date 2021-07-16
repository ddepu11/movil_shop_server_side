import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormControl = ({
  inputValue,
  handleInput,
  id,
  placeholder,
  refObj,
  type,
  name,
  label,
}) => (
  <Wrapper className="form-control">
    <div className="fc_top">
      <label htmlFor={id}>{label}</label>
      <span className="must"> *</span>
    </div>

    <input
      value={inputValue}
      onChange={handleInput}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
    />
    <p ref={refObj} className="message" />
  </Wrapper>
);

FormControl.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  refObj: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .fc_top {
    padding: 8px 0;
    .must {
      color: red;
      font-size: 1.25em;
    }
    label {
      font-size: 1.3em;
      color: #222;
    }
  }

  label {
    font-size: 1.3em;
    padding: 8px 0;
  }

  input {
    background: #e9ebeb;
    padding: 8px 5px;
    border-radius: 5px;
    font-size: 1.2em;
    color: #5a5a5f;
  }

  .pwd-label {
    justify-content: space-between;
  }

  .message.error {
    color: red;
    font-size: 1.2em;
  }

  .message.success {
    color: green;
    font-size: 1.2em;
  }
`;

export default FormControl;

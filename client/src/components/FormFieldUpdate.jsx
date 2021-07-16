import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormFieldUpdate = ({
  heading,
  wannaEdit,
  inputValue = '',
  type,
  inputName,
  handleInput,
  refObj,
  spanInnerText,
}) => (
  <Wrapper className="flex">
    <h4>{heading}</h4>
    {wannaEdit ? (
      <div className="flex">
        <input
          value={inputValue}
          type={type}
          name={inputName}
          onChange={handleInput}
        />
        <p ref={refObj} className="message" />
      </div>
    ) : (
      <span>{spanInnerText}</span>
    )}
  </Wrapper>
);

FormFieldUpdate.propTypes = {
  heading: PropTypes.string.isRequired,
  wannaEdit: PropTypes.bool.isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  refObj: PropTypes.object.isRequired,
  spanInnerText: PropTypes.string,
};

FormFieldUpdate.defaultProps = {
  inputValue: 'XYZ',
  spanInnerText: 'XYZ',
};

const Wrapper = styled.div`
  justify-content: space-between;
  padding: 0px 0 30px;

  h4 {
    font-size: 1.2em;
    color: #444;
    letter-spacing: 2px;
  }

  div {
    flex-direction: column;
    width: 38%;
    align-items: flex-start;

    p {
      transition: all 0.5s ease;
      height: 0;
      width: 0;
      overflow: hidden;
    }
  }

  span {
    font-size: 1em;
    color: #333;
    letter-spacing: 1px;
    display: block;
    width: 38%;
  }

  input {
    padding: 10px 0px 10px 5px;
    font-size: 1em;
    border-radius: 2px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  }

  .message.error {
    color: red;
    font-size: 1.1em;
  }

  .message.success {
    color: green;
    font-size: 1.1em;
  }

  .message.success,
  .message.error {
    height: auto;
    width: auto;
  }
`;

export default FormFieldUpdate;

import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/Loading';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import SignUpScreenLogic from './logic/SignUpScreenLogic';

const SignUpScreen = () => {
  const {
    userSignUpSuccess,
    userLoading,
    handleSubmit,
    handleDP,
    dpValidationMessageTag,
    handleInput,
    signUpCredentials,
    firstNameValidationMessageTag,
    lastNameValidationMessageTag,
    genderValidationMessageTag,
    phoneNumberValidationMessageTag,
    emailValidationMessageTag,
    passwordValidationMessageTag,
    confirmPasswordValidationMessageTag,
    dbLabelRef,
  } = SignUpScreenLogic();

  if (userLoading) {
    return <Loading />;
  }

  if (userSignUpSuccess) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <Wrapper className="w-960">
      <h1>Get your free MovilShop account now</h1>

      <form onSubmit={handleSubmit}>
        <div className="row flex">
          <div className="flex fn_ln_div">
            <FormControl
              inputValue={signUpCredentials.firstName}
              handleInput={handleInput}
              id="first_name"
              placeholder="Enter your first name"
              refObj={firstNameValidationMessageTag}
              type="text"
              name="firstName"
              label="First Name"
            />

            <FormControl
              inputValue={signUpCredentials.lastName}
              handleInput={handleInput}
              id="last_name"
              placeholder="Enter your last name"
              refObj={lastNameValidationMessageTag}
              type="text"
              name="lastName"
              label="Last Name"
            />
          </div>

          <div className="flex gender_seller_div">
            {/* Gender >>>> */}
            <div className="form-control">
              <h2 className="gender_heading">
                Gender{' '}
                <span style={{ color: 'red', fontSize: '1.1em' }}> *</span>
              </h2>

              <dir className="gender">
                <div className="flex">
                  <label htmlFor="male">Male</label>
                  <input
                    value="male"
                    onChange={handleInput}
                    type="radio"
                    id="male"
                    name="gender"
                    placeholder="Enter your last name."
                  />
                </div>

                <div className="flex">
                  <label htmlFor="female">Female</label>
                  <input
                    value="female"
                    onChange={handleInput}
                    type="radio"
                    id="female"
                    name="gender"
                    placeholder="Enter your last name."
                  />
                </div>
              </dir>

              <p ref={genderValidationMessageTag} className="message" />
            </div>
            {/* Gender Ends */}

            {/* Seeler >>>> */}
            <div className="form-control role-div flex">
              <p>Do you want to be a seller?</p>

              <div className="role_inputs flex">
                <input
                  type="checkbox"
                  placeholder="Wanna be seller??"
                  id="role"
                  name="role"
                  onChange={handleInput}
                />
                <label htmlFor="role">Yes</label>
              </div>
            </div>
            {/* Seeler Ends>>>> */}
          </div>
        </div>

        <div className="row flex">
          <FormControl
            inputValue={signUpCredentials.phoneNumber}
            handleInput={handleInput}
            id="phone_number"
            placeholder="Enter your phone number"
            refObj={phoneNumberValidationMessageTag}
            type="text"
            name="phoneNumber"
            label="Phone Number"
          />

          <FormControl
            inputValue={signUpCredentials.email}
            handleInput={handleInput}
            id="email"
            placeholder="Enter your email address"
            refObj={emailValidationMessageTag}
            type="text"
            name="email"
            label="Email Address"
          />
        </div>

        <div className="row flex">
          <FormControl
            inputValue={signUpCredentials.password}
            handleInput={handleInput}
            id="password"
            placeholder="Enter your password"
            refObj={passwordValidationMessageTag}
            type="password"
            name="password"
            label="Password"
          />

          <FormControl
            inputValue={signUpCredentials.confirmPassword}
            handleInput={handleInput}
            id="confirm_password"
            placeholder="Confirm your password"
            refObj={confirmPasswordValidationMessageTag}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
          />
        </div>

        {/* File Upload  */}
        <div className="row flex">
          <div className="form-control">
            <p>Upload your display picture</p>
            <label htmlFor="dp" className="dp-label" ref={dbLabelRef}>
              Choose file...
              <span className="browse_btn">Browse</span>
            </label>

            <input
              type="file"
              name="dp"
              id="dp"
              className="dp"
              onChange={handleDP}
              accept=".jpg, .png, .jpeg"
            />
            <p ref={dpValidationMessageTag} className="message" />
          </div>
        </div>

        <Button
          handleClick={handleSubmit}
          pt="8px"
          pb="8px"
          pl="10px"
          pr="10px"
          fs="1.2em"
          bgColor="var(--success-color)"
          width="33%"
          mt="12px"
        >
          Create Account
        </Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 35px 0;

  h1 {
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #333;
    font-size: 2em;
  }

  form {
    margin-top: 25px;
    .row {
      align-items: stretch;

      .fn_ln_div {
        flex-direction: column;
        width: 100%;
      }

      .gender_seller_div {
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;

        .gender_heading {
          font-size: 1.3em;
          color: #222;
          font-weight: 400;
          margin-bottom: 5px;
        }

        .gender {
          width: 60%;

          div {
            justify-content: space-between;
            padding-bottom: 3px;
            label {
              font-size: 1.2em;
            }
          }
        }

        .role-div {
          align-items: flex-start;
          justify-content: space-between;
          margin-top: 20px;

          .role_inputs {
            width: 30%;
            position: relative;
            padding: 12px 0 0 0px;
            cursor: pointer;

            label {
              font-size: 1.2em;
              color: #222;
              position: absolute;
              left: 30px;
            }

            input {
              background: #e2dcdc;
              padding: 0px 0px;
              border-radius: 0px;
              font-size: 0em;
              width: 10%;
              position: absolute;
              left: 0px;
            }
          }
        }
      }

      .form-control {
        display: flex;
        flex-direction: column;
        width: 100%;

        p {
          font-size: 1.3em;
          padding: 0px 0px 10px;
          color: #222;
        }

        input {
          font-size: 1.1em;
          width: 65%;
        }

        .dp-label {
          width: 32.5%;
          padding: 12px 0px 12px 3px;
          border: 1px solid #a7a7a7;
          font-size: 0.8em;
          position: relative;
          color: #535353;
          background: #fff;
          border-radius: 0.25rem;
          box-shadow: inset 0 0.2rem 0.4rem #cacaca;
          .browse_btn {
            background: #c9c3c3;
            color: #303030;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            display: grid;
            place-items: center;
            padding: 0 20px;
          }
        }

        .dp-label:hover {
          box-shadow: inset 0 0.2rem 0.4rem #b4b4b4;

          .browse_btn {
            color: #c9c3c3;
            background: #303030;
          }
        }
        .dp {
          display: none;
        }

        .message.error {
          color: var(--danger-color);
          font-size: 1.2em;
        }

        .message.success {
          color: var(--success-color);
          font-size: 1.2em;
        }
      }
    }
  }
`;

export default SignUpScreen;

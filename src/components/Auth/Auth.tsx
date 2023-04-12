import { useState } from 'react';
import AuthLayout from '../../pages/AuthLayout/AuthLayout';
import SigninLayout from '../../pages/SigninLayout/SigninLayout';
import SignupLayout from '../../pages/SignupLayout/SignupLayout';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  secondName: '',
};

const Auth = () => {
  const [formValue, setFormValue] = useState(initialState);

  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  const { firstName, secondName, email, password, confirmPassword } = formValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const openSignUpFrom = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const openSignInForm = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  return (
    <>
      {
        <AuthLayout>
          {showSignIn && (
            <>
              <SigninLayout email={email} password={password} handleChange={handleChange} />
              <p className="text-white-50 fw-bold">No account with this email was found?</p>
              <p className="text-white-50 fw-bold" style={{ cursor: 'pointer' }} onClick={openSignUpFrom}>
                Sign Up
              </p>
            </>
          )}
          {showSignUp && (
            <>
              <SignupLayout
                firstName={firstName}
                secondName={secondName}
                email={email}
                password={password}
                handleChange={handleChange}
                confirmPassword={confirmPassword}
              />
              <p className="text-white-50 fw-bold">Already have an account?</p>
              <p className="text-white-50 fw-bold" style={{ cursor: 'pointer' }} onClick={openSignInForm}>
                Sign In
              </p>
            </>
          )}
        </AuthLayout>
      }
    </>
  );
};

export default Auth;

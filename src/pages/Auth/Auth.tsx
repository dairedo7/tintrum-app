import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBInput } from 'mdb-react-ui-kit';

import { useSignInUserMutation, useSignUpUserMutation } from '../../services/authApi';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice';

// import styles from './Auth.module.scss';

const initialState = {
  firstName: '',
  secondName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { firstName, secondName, email, password, confirmPassword } = formValue;
  const [showSignUp, setShowSignUp] = useState(false);
  const [signInUser, { data: signInData, isSuccess: isSignInSuccess, isError: isSignInError, error: signInError }] = useSignInUserMutation();
  const [signUpUser, { data: signUpData, isSuccess: isSignUpSuccess, isError: isSignUpError, error: signUpError }] = useSignUpUserMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    if (email && password) {
      await signInUser({ email, password });
    } else {
      toast.error('Please, fill out all inut fields');
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match!");
    }

    if (firstName && secondName && password && email) {
      await signUpUser({ firstName, secondName, password, email });
    }
  };

  useEffect(() => {
    if (isSignInError) {
      toast.error((signInError as any).data.message);
    }
    if (isSignUpError) {
      toast.error((signUpError as any).data.message);
    }
    if (isSignInSuccess) {
      toast.success('You have been successfully logged in');
      dispatch(setUser({ name: signInData, token: signInData }));
      navigate('/dashboard');
    }
    if (isSignUpSuccess) {
      toast.success('You have been successfully signed up');
      dispatch(setUser({ name: signUpData, token: signUpData }));
      navigate('/dashboard');
    }
  }, [dispatch, isSignInError, isSignInSuccess, isSignUpError, isSignUpSuccess, navigate, signInData, signInError, signUpData, signUpError]);

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-4 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">{!showSignUp ? 'Sign In' : 'Sign Up'}</h2>
                  <p className="text-white-50 mb-4">{!showSignUp ? 'Please, enter your email and password' : 'Please, fill out the form'}</p>
                  {showSignUp && (
                    <>
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={handleChange}
                          label="First Name"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="text"
                          name="secondName"
                          value={secondName}
                          onChange={handleChange}
                          label="Second Name"
                          className="form-control form-control-lg"
                        />
                      </div>
                    </>
                  )}
                  <div className="form-outline form-white mb-4">
                    <MDBInput type="email" name="email" value={email} onChange={handleChange} label="Email" className="form-control form-control-lg" />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      label="Password"
                      className="form-control form-control-lg"
                    />
                  </div>
                  {showSignUp && (
                    <div className="form-outline form-white mb-4">
                      <MDBInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password"
                        className="form-control form-control-lg"
                      />
                    </div>
                  )}
                  {!showSignUp ? (
                    <button
                      className="btn btn-outline-light btn-lg px-5 mb-4"
                      onClick={() => {
                        handleSignIn();
                      }}
                      type="button"
                    >
                      Sign in
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      onClick={() => {
                        handleSignUp();
                      }}
                      type="button"
                    >
                      Sign up
                    </button>
                  )}
                </div>
                <div>
                  <h5 className="mb-0">
                    {!showSignUp ? (
                      <>
                        No account with this email was found ?
                        <p className="text-white-50 fw-bold" style={{ cursor: 'pointer' }} onClick={() => setShowSignUp(true)}>
                          Sign Up
                        </p>
                      </>
                    ) : (
                      <>
                        You already have an account ?
                        <p className="text-white-50 fw-bold" style={{ cursor: 'pointer' }} onClick={() => setShowSignUp(false)}>
                          Sign In
                        </p>
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;

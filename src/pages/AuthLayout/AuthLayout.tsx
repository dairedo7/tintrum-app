// import { FormValues } from '../../types/form';
import { MDBInput } from 'mdb-react-ui-kit';
import React, { useState } from 'react';

interface AuthProps {
  formValues: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignIn: () => void;
  handleSignUp: () => void;
}

const AuthLayout: React.FC<AuthProps> = (props) => {
  const { firstName, secondName, email, password, confirmPassword } = props.formValues;
  const { handleChange, handleSignIn, handleSignUp } = props;

  const [showSignUp, setShowSignUp] = useState(false);

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
                    <button className="btn btn-outline-light btn-lg px-5 mb-4" onClick={handleSignIn} type="button">
                      Sign in
                    </button>
                  ) : (
                    <button className="btn btn-outline-light btn-lg px-5" onClick={handleSignUp} type="button">
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

export default AuthLayout;

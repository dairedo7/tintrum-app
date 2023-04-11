import { MDBInput } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSignInUserMutation } from '../../services/authApi';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { setUser } from '../../features/authSlice';

interface SignInLayoutProps {
  email: string;
  password: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SigninLayout = ({ email, password, handleChange }: SignInLayoutProps) => {
  const [signInUser, { data: signInData, isSuccess: isSignInSuccess, isError: isSignInError, error: signInError }] = useSignInUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (email && password) {
      await signInUser({ email, password });
    } else {
      toast.error('Please, fill out all input fields');
    }
  };

  useEffect(() => {
    if (isSignInError) {
      toast.error((signInError as any).data.message);
    }
    if (isSignInSuccess) {
      toast.success('You have been successfully logged in');
      dispatch(setUser({ name: signInData, token: signInData }));
      navigate('/dashboard');
    }
  }, [dispatch, isSignInError, isSignInSuccess, navigate, signInData, signInError]);

  return (
    <>
      <div className="mb-md-5 mt-md-4 pb-5">
        <h2 className="fw-bold mb-2 text-uppercase">Sign In</h2>
        <p className="text-white-50 mb-4">Please, enter your email and password</p>

        <>
          <div className="form-outline form-white mb-4">
            <MDBInput type="email" name="email" value={email} onChange={handleChange} label="Email" className="form-control form-control-lg" />
          </div>
          <div className="form-outline form-white mb-4">
            <MDBInput type="password" name="password" value={password} onChange={handleChange} label="Password" className="form-control form-control-lg" />
          </div>
          <button className="btn btn-outline-light btn-lg px-5 mb-4" onClick={handleSignIn} type="button">
            Sign in
          </button>
        </>
      </div>
    </>
  );
};

export default SigninLayout;

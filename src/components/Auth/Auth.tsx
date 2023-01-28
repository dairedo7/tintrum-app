import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignInUserMutation, useSignUpUserMutation } from '../../services/authApi';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice';

import AuthLayout from '../../pages/AuthLayout/AuthLayout';

import { FormValues } from '../../types/form';

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

  const getFormValues = (formValue: FormValues) => {
    setFormValue(formValue);
  };

  const [signInUser, { data: signInData, isSuccess: isSignInSuccess, isError: isSignInError, error: signInError }] = useSignInUserMutation();
  const [signUpUser, { data: signUpData, isSuccess: isSignUpSuccess, isError: isSignUpError, error: signUpError }] = useSignUpUserMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    if (email && password) {
      // console.log(email);
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
    <>
      <AuthLayout formValues={getFormValues} handleChange={handleChange} handleSignIn={handleSignIn} handleSignUp={handleSignUp} />
    </>
  );
};

export default Auth;

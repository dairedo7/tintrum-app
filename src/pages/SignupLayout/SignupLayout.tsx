import { MDBInput } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '../../features/authSlice';
import { useSignUpUserMutation } from '../../services/authApi';

interface SignUpLayoutProps {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  confirmPassword: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSignIn: () => void;
}

const SignupLayout = ({ email, password, firstName, secondName, confirmPassword, handleChange }: SignUpLayoutProps) => {
  const [showSignUp, setShowSignUp] = useState(false);

  const [signUpUser, { data: signUpData, isSuccess: isSignUpSuccess, isError: isSignUpError, error: signUpError }] = useSignUpUserMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match!");
    }

    if (firstName && secondName && password && email) {
      await signUpUser({ firstName, secondName, password, email });
    }
  };

  useEffect(() => {
    if (isSignUpError) {
      toast.error((signUpError as any).data.message);
    }

    if (isSignUpSuccess) {
      toast.success('You have been successfully signed up');
      dispatch(setUser({ name: signUpData, token: signUpData }));
      navigate('/dashboard');
    }
  }, [dispatch, isSignUpError, isSignUpSuccess, navigate, signUpData, signUpError]);

  return (
    <>
      <div className="mb-md-5 mt-md-4 pb-5">
        <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
        <p className="text-white-50 mb-4">Please, fill out the form</p>
        <>
          <div className="form-outline form-white mb-4">
            <MDBInput type="text" name="firstName" value={firstName} onChange={handleChange} label="First Name" className="form-control form-control-lg" />
          </div>
          <div className="form-outline form-white mb-4">
            <MDBInput type="text" name="secondName" value={secondName} onChange={handleChange} label="Second Name" className="form-control form-control-lg" />
          </div>

          <div className="form-outline form-white mb-4">
            <MDBInput type="email" name="email" value={email} onChange={handleChange} label="Email" className="form-control form-control-lg" />
          </div>
          <div className="form-outline form-white mb-4">
            <MDBInput type="password" name="password" value={password} onChange={handleChange} label="Password" className="form-control form-control-lg" />
          </div>

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
        </>

        <button className="btn btn-outline-light btn-lg px-5" onClick={handleSignUp} type="button">
          Sign up
        </button>
      </div>
    </>
  );
};

export default SignupLayout;

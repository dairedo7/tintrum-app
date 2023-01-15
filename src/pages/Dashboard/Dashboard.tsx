import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { signOut, selectAuth } from '../../features/authSlice';

const Dashboard = () => {
  const { name }: any = useAppSelector(selectAuth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    toast.success('You have successfully logged out!');
    navigate('/auth');
  };

  const openToDoList = () => {
    navigate('/tasks');
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-4 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2">Welcome to your Dashboard</h2>
                  <h4>Name: {name?.user.name}</h4>
                  <button
                    className="btn btn-outline-light btn-lg px-5 mt-5"
                    onClick={() => {
                      openToDoList();
                    }}
                    type="button"
                  >
                    Tasks List
                  </button>
                </div>
                <button
                  className="btn btn-outline-light btn-lg px-5 mt-3"
                  onClick={() => {
                    handleSignOut();
                  }}
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

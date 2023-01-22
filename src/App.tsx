import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import { ActiveToDoLayout } from './pages/ActiveToDo/ActiveToDo';
import { FinishedToDoLayout } from './pages/FinishedToDo/FinishedToDo';

import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './app/hooks';
import { setUser } from './features/authSlice';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    dispatch(setUser(user));
  });

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />}></Route>
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <ActiveToDoLayout />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/finished"
            element={
              <PrivateRoute>
                <FinishedToDoLayout />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<h1 className="p-4 text-white">The page you're trying to reach does not exist!</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

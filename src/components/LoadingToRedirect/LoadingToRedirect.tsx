import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBModal, MDBModalDialog, MDBModalContent } from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    if (location.pathname === '/dashboard') {
      count === 0 && navigate('/auth');
    }

    if (location.pathname === '/tasks') {
      count === 0 && navigate('/auth');
    }

    if (location.pathname === '/auth') {
      navigate('/dashboard');
    }

    return () => clearInterval(interval);
  }, [location.pathname, count, navigate]);
  return (
    <div className="vh-100 gradient-custom">
      <MDBModal show={true}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <p className="mt-3">Redirecting in {count} sec</p>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default LoadingToRedirect;

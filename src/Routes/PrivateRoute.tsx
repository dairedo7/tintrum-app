import { useSelector } from 'react-redux';
import LoadingToRedirect from '../components/LoadingToRedirect/LoadingToRedirect';
import { selectAuth } from '../features/authSlice';

const PrivateRoute = ({ children }: { children: any }) => {
  const { token } = useSelector(selectAuth);
  return token ? children : <LoadingToRedirect />;
};

export default PrivateRoute;

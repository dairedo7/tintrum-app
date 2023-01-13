import { useSelector } from 'react-redux';
import LoadingToRedirect from '../components/LoadingToRedirect/LoadingToRedirect';
import { selectAuth } from '../features/authSlice';

const PublicRoute = ({ children }: { children: any }) => {
  const { token } = useSelector(selectAuth);
  return token ? <LoadingToRedirect /> : children;
};

export default PublicRoute;

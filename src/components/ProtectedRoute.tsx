import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user }: any): any => {
  if (!user) {
    return <Navigate to="/home" />;
  }
  return children;
};

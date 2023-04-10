import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { userStore } from '@Stores/UserStore';

interface RouteProperties {
  element: JSX.Element;
}

const ProtectedRoute: FC<RouteProperties> = ({ element }) => {
  const location = useLocation();

  return userStore.authenticated || location.pathname === '/' ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;

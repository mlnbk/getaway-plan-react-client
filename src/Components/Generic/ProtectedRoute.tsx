import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { userStore } from '@Stores/UserStore';

interface RouteProperties {
  element: JSX.Element;
}

const ProtectedRoute: FC<RouteProperties> = ({ element }) => {
  return userStore.authenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

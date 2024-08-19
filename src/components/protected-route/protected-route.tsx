import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(userSelectors.selectUser);
  const isAuthChecked = useSelector(userSelectors.selectIsAuthChecked);

  if (!isAuthChecked) return <Preloader />;

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const fromPage = location.state?.from || { pathname: '/' };

    return <Navigate replace to={fromPage} />;
  }
  return children;
};

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [cookies] = useCookies(['token']); // Lấy token từ cookie

  const isAuthenticated = Boolean(cookies.token); 

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Redirect to="/login" />}
    />
  );
};

export default PrivateRoute;

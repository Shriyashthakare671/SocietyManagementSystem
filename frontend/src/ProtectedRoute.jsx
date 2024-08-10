import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Example of a fake authentication function
const isAuthenticated = () => {
  // You can implement your own authentication logic here
  // For example, check if a token exists in local storage or cookies
  // Return true if authenticated, false otherwise
  return localStorage.getItem('token') !== null;
};

// Higher-order component for protecting routes
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;

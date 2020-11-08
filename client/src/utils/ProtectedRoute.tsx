import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component, ...rest }: any) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("isAuthenticated") != null && localStorage.getItem("isAuthenticated")
      ? React.createElement(component, props)
      : (<Redirect to={{
          pathname: '/admin',
          state: { from: props.location }
        }} />)
  )} />
);
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const hasExpired = () => {
  if (localStorage.getItem('isAuthenticated') == null)
    return false;
  let token:string = localStorage.getItem('token') || 'Bearer ';
  token = token.replace('Bearer ','');
  const decodedToken:any = jwtDecode(token);
  const expirationTime = (decodedToken.exp * 1000)
  if (Date.now() >= expirationTime) {
    localStorage.clear();
    return false;
  }
  return true;
}

export const ProtectedRoute = ({ component, ...rest }: any) => (
  <Route {...rest} render={(props) => (
     hasExpired() && localStorage.getItem("isAuthenticated")
      ? React.createElement(component, props)
      : (<Redirect to={{
          pathname: '/admin',
          state: { from: props.location }
        }} />)
  )} />
);
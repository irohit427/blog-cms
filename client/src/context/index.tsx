import React, {createContext, useReducer } from 'react';
import { AuthInterface } from '../interface/AuthInterface';


const initialState: AuthInterface = {
  isAuthenticated: false,
  token: '',
  user: {
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  }
}

//const Context = React.createContext<UserInterface>(initialState);
export const Context = createContext<{
  state: AuthInterface;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'LOGIN':
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(action.payload.userInfo));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("isAuthenticated", JSON.stringify(!!action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.userInfo,
        token: action.payload.token
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: '',
        user: {
          firstName: '',
          lastName: '',
          email: '',
          username: ''
        }
      }
    default:
      return state;
  }
}

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{state, dispatch}}>
      {children}
    </Context.Provider>
  )
}

//export const Provider = Context.Provider;
export const Consumer = Context.Consumer;
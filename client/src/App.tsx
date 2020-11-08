import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Provider } from './context';
import AddBlog from './pages/AddBlog';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/Users';
import { ProtectedRoute } from './utils/ProtectedRoute';

function App() {
  return (
    <Provider>
        <BrowserRouter>
          <Switch>
            <Route path={["/", "/home"]} exact component={Home} />
            <Route path="/admin" component={Login}/>
            <ProtectedRoute path="/dashboard" exact component={Dashboard}></ProtectedRoute>
            <Route path="/add-blog" component={AddBlog} />
            <Route path="/users" component={Users} />
          </Switch>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;

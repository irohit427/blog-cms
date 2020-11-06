import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import AddBlog from './pages/AddBlog';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/", "/home"]} exact component={Home} />
        <Route path="/admin" component={Login}/>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/add-blog" component={AddBlog} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

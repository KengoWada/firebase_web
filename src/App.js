import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './Components/Auth/Registration';
import Posts from './Components/Posts/Posts';

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/posts" exact>
          <Posts />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

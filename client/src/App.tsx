import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Room from './pages/Room';

export default function App(): JSX.Element {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/room/:id">
          <Room />
        </Route>
      </Switch>
    </Router>
  )
}
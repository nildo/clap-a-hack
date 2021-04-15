import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Room from './pages/Room';
import 'antd/dist/antd.css';
import AppContextProvider from './context/ContextProvider';

export default function App(): JSX.Element {

  return (
    <AppContextProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/room/:roomid">
            <Room />
          </Route>
        </Switch>
      </Router>
    </AppContextProvider>
  )
}

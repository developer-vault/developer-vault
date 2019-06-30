import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Starter from './app/starter/Starter';
import Register from './app/register/Register';
import Login from './app/login/Login';
import Home from './app/home/Home';
import NodeManager from './app/nodes/NodeManager';

const App = () => (
  <Switch>
    <Route exact path="/starter" component={Starter} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/nodes" component={NodeManager} />

    <Redirect from="/" to="/starter" />
  </Switch>
);

App.displayName = 'App';

export default App;

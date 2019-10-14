import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Starter from './app/starter/Starter';
import Register from './app/register/Register';
import Login from './app/login/Login';
import Nodes from './app/nodes/Nodes';

const App = () => (
  <Switch>
    <Route exact path="/starter" component={Starter} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/nodes" component={Nodes} />

    <Redirect from="/" to="/starter" />
  </Switch>
);

App.displayName = 'App';

export default App;

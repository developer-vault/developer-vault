import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Starter from './app/starter/Starter';
import Register from './app/register/Register';
import Login from './app/login/Login';
import Home from './app/home/Home';
import NodeManager from './app/nodes/NodeManager';

class App extends Component {
  /**
   * Renders the component.
   */
  render() {
    return (
      <Switch>
        <Route exact path="/starter" component={Starter} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/nodes" component={NodeManager} />

        <Redirect from="/" to="/starter" />
      </Switch>
    );
  }
}

export default App;

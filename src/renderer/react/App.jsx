import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Starter from './app/starter/Starter';
import Register from './app/register/Register';
import Login from './app/login/Login';
import Home from './app/home/Home';

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

        <Redirect from="/" to="/starter" />
      </Switch>
    );
  }
}

export default App;

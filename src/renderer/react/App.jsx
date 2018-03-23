import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Register from './app/register/Register';
import NodeManager from './app/nodes/NodeManager';

class App extends Component {
  /**
   * Renders the component.
   */
  render() {
    return (
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/nodes" component={NodeManager} />
        <Redirect to="/nodes" />
      </Switch>
    );
  }
}

export default App;

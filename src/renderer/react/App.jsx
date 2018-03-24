import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Starter from './app/starter/Starter';
import Register from './app/register/Register';

class App extends Component {
  /**
   * Renders the component.
   */
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Starter} />
        <Route exact path="/register" component={Register} />
      </Switch>
    );
  }
}

export default App;

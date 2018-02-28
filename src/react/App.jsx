import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import logo from 'assets/logo.svg';
import './App.css';

class App extends Component {
  /**
   * Renders the component.
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            <FormattedMessage
              id="global.welcome"
              defaultMessage="Welcome !"
            />
          </h1>
        </header>
        <p className="App-intro">
          <FormattedMessage
            id="global.intro"
            defaultMessage="To get started, edit src/App.js and save to reload."
          />
        </p>
      </div>
    );
  }
}

export default App;

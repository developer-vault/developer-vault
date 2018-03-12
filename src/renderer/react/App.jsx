import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { send } from 'services/ipc';

import { OPEN_MENU_POPUP } from 'common/events';

import logo from 'assets/logo.svg';
import './App.css';

class App extends Component {
  state = {
    isMenuPopUpOpen: false,
  };

  onClickButton = async () => {
    this.setState({ isMenuPopUpOpen: await send(OPEN_MENU_POPUP) });
  };

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
        <p>
          <button onClick={this.onClickButton}>Test IPC : { `${this.state.isMenuPopUpOpen}` }</button>
        </p>
      </div>
    );
  }
}

export default App;

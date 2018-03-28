import React from 'react';
import isAuthenticated from 'react/hoc/isAuthenticated';

@isAuthenticated
export default class Home extends React.PureComponent {
  /** Renders component. */
  render() {
    return (
      <div>Home</div>
    );
  }
}

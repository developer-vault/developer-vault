import React from 'react';
import isAuthenticated from 'react/hoc/isAuthenticated';

@isAuthenticated
export default class Home extends React.PureComponent {
  /** Renders component. */
  render() {
    return (
      <div>
        <h1>Home</h1>
        <ul>
          <li>
            <button
              // This component is a placeholder.
              // eslint-disable-next-line react/prop-types
              onClick={() => this.props.history.push('/nodes')}
            >
              Nodes management
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

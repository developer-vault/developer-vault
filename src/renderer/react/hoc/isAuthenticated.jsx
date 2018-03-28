import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { generateHocDisplayName } from 'utils/components';

const mapStateToProps = state => ({
  authenticated: state.app.authenticated,
});

export default (WrappedComponent) => {
  @connect(mapStateToProps)
  class isAuthenticated extends React.Component {
    static propTypes = {
      /** has the user logged in or registered ? */
      authenticated: PropTypes.bool.isRequired,
    };

    static displayName = generateHocDisplayName('isAuthenticated', WrappedComponent);

    /** Renders component. */
    render() {
      const { authenticated, ...props } = this.props;
      return (
        authenticated ?
          <WrappedComponent {...props} /> :
          <Redirect to="/starter" />
      );
    }
  }

  return isAuthenticated;
};

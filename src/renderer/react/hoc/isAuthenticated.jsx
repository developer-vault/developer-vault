import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { emptyMapDispatchToProps } from 'services/redux/empty';

const mapStateToProps = (state) => ({
  authenticated: state.app.authenticated,
});

export default (WrappedComponent) => {
  const enhancer = connect(mapStateToProps, emptyMapDispatchToProps);

  const isAuthenticated = ({ authenticated, ...props }) => (
    authenticated
      ? <WrappedComponent {...props} />
      : <Redirect to="/starter" />
  );

  isAuthenticated.displayName = wrapDisplayName(WrappedComponent, 'isAuthenticated');

  isAuthenticated.propTypes = {
    /** Has the user logged in or registered? */
    authenticated: PropTypes.bool.isRequired,
  };

  return enhancer(isAuthenticated);
};

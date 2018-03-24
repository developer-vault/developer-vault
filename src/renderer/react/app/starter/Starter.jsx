import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isInitialized: state.app.initialized,
});

const Starter = (props) => {
  if (props.isInitialized) {
    return (
      <Redirect to="/login" />
    );
  }
  return (
    <Redirect to="/register" />
  );
};

Starter.propTypes = {
  isInitialized: PropTypes.bool,
};

Starter.defaultProps = {
  isInitialized: false,
};

export default connect(mapStateToProps)(Starter);

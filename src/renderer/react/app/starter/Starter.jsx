import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  initialized: state.app.initialized,
});

const Starter = (props) => {
  if (props.initialized) {
    return (
      <Redirect to="/login" />
    );
  }
  return (
    <Redirect to="/register" />
  );
};

Starter.propTypes = {
  /* Is the store file created ? */
  initialized: PropTypes.bool,
};

Starter.defaultProps = {
  initialized: false,
};

export default connect(mapStateToProps)(Starter);

import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { FormattedMessage } from 'react-intl';

import globalMessages from 'intl/global.messages';
import { moduleShape } from 'react/shapes/module';

// Will redesign that whole screen later.
const iconStyle = { width: 30, height: 30 };

const enhancer = compose(
  withHandlers({
    // Wrap the onInstall callback so it returns the module
    // instead of the click event.
    onInstall: ({ module, onInstall }) => () => onInstall(module),
  }),

  React.memo,
);

const AvailableModulesListElement = ({ module, onInstall }) => {
  const { manifest, icon: Icon } = module;

  return (
    <div>
      <h2>{manifest.displayName || manifest.name}</h2>
      <Icon style={iconStyle} />
      <p>{manifest.description}</p>
      <button type="button" onClick={onInstall}>
        <FormattedMessage {...globalMessages.INSTALL} />
      </button>
    </div>
  );
};

AvailableModulesListElement.propTypes = {
  module: PropTypes.shape(moduleShape).isRequired,
  onInstall: PropTypes.func.isRequired,
};

export default enhancer(AvailableModulesListElement);

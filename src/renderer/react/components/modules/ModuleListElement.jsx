import React from 'react';
import PropTypes from 'prop-types';
import { moduleShape } from 'react/shapes/module';

// Will redesign that whole screen later.
const iconStyle = { width: 30, height: 30 };

const ModuleListElement = ({ module }) => {
  const { manifest, icon: Icon } = module;

  return (
    <div>
      <h2>{manifest.displayName || manifest.name}</h2>
      <Icon style={iconStyle} />
      <p>{manifest.description}</p>
    </div>
  );
};

ModuleListElement.propTypes = {
  module: PropTypes.shape(moduleShape).isRequired,
};

export default React.memo(ModuleListElement);

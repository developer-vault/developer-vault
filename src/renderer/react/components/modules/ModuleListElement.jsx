import React from 'react';
import PropTypes from 'prop-types';
import { moduleShape } from 'react/shapes/module';

// const logoStyle = {width: 3}

const ModuleListElement = ({ module }) => {
  // This is a proof of concept that we're able to load the renderer.
  // Obviously it doesn't belong here.
  const { renderer: { node: Node } } = module;

  const { manifest } = module;

  return (
    <div>
      <h2>{manifest.displayName || manifest.name}</h2>
      <img src={module.icon} />
      <p>{manifest.description}</p>

      <Node />
    </div>
  );
};

ModuleListElement.propTypes = {
  module: PropTypes.shape(moduleShape).isRequired,
};

export default React.memo(ModuleListElement);

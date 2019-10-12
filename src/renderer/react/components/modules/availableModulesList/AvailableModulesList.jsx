import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { moduleShape } from 'react/shapes/module';
import AvailableModulesListElement from './AvailableModulesListElement';

const AvailableModulesList = ({
  modules,
  onInstall,
}) => (
  <div>
    {modules.map(module => (
      <AvailableModulesListElement
        key={module.name}
        module={module}
        onInstall={onInstall}
      />
    ))}
  </div>
);

AvailableModulesList.propTypes = {
  modules: PropTypes.arrayOf(moduleShape),
  onInstall: PropTypes.func,
};

AvailableModulesList.defaultProps = {
  modules: [],
  onInstall: noop,
};

export default React.memo(AvailableModulesList);

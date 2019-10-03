import React from 'react';
import { listNodesModules } from 'services/modules';

export default class ModuleHandler extends React.PureComponent {
  /**
   * Test a render of all modules available in the system.
   */
  render() {
    const modules = listNodesModules();

    return (
      <p>
        {modules.map((module) => {
          const { renderer: { node } } = module;
          return React.createElement(node);
        })}
      </p>
    );
  }
}

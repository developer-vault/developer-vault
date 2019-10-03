import React from 'react';
import { listNodesModules } from 'services/modules';
import ModuleListElement from 'react/components/modules/ModuleListElement';

export default class NodeWorkZone extends React.PureComponent {
  /**
   * Test a render of all modules available in the system.
   */
  render() {
    const modules = listNodesModules();

    return (
      <p>
        {modules.map(module => <ModuleListElement key={module.name} module={module} />)}
      </p>
    );
  }
}

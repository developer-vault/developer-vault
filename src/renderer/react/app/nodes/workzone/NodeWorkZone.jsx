import React from 'react';
import PropTypes from 'prop-types';
import { STATUS, notify } from 'reapop';
import { compose } from 'recompose';

import { listNodesModules } from 'domain/modules';
import AvailableModulesList from 'react/components/modules/availableModulesList/AvailableModulesList';
import { connect } from 'redux/utils';
import { selectNodeById, selectNodesMap } from 'redux/stores/nodes/selector';
import { nodeShape } from 'react/shapes/node';

const enhancer = compose(
  connect(
    (state, props) => ({
      node: selectNodeById(state, props.activeNodeId),
      nodesMap: selectNodesMap(state),
    }),
    {
      notify,
    },
  ),
);

class NodeWorkZone extends React.PureComponent {
  static propTypes = {
    node: nodeShape,
    notify: PropTypes.func.isRequired,
  };

  static defaultProps = {
    node: null,
  };

  onInstall = (module) => {
    this.props.notify({
      message: `TODO: install ${module.manifest.name} on node ${this.props.node?.label}`,
      status: STATUS.success,
      dismissible: true,
    });
  };

  /**
   * Render component.
   */
  render() {
    const {
      node,
    } = this.props;
    const modules = listNodesModules();

    return (
      <div>
        {node && (
          <div>
            <h1>{node.label}</h1>
            <AvailableModulesList modules={modules} onInstall={this.onInstall} />
          </div>
        )}
      </div>
    );
  }
}

export default enhancer(NodeWorkZone);

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';

import { connect } from 'redux/utils';
import { selectNodesMap, selectNodesTree } from 'redux/stores/nodes/selector';
import { nodeShape, nodeTreeElement } from 'react/shapes/node';
import NodeList from 'react/components/nodes/list/NodeList';
import Button from 'react/components/general/button/Button';

import messages from 'intl/nodes.messages';

const enhancer = compose(
  connect(
    state => ({
      nodesTree: selectNodesTree(state),
      nodesMap: selectNodesMap(state),
    }),
  ),
);

class NodeManagerList extends React.PureComponent {
  static propTypes = {
    /** Called when "add child" button is clicked. */
    onAddNode: PropTypes.func.isRequired,
    /** Called when "add root node" button is clicked. */
    onAddRootNode: PropTypes.func.isRequired,
    /** Called when "edit" button is clicked. */
    onEditNode: PropTypes.func.isRequired,
    /** Called when "delete" button is clicked. */
    onDeleteNode: PropTypes.func.isRequired,
    /** Hashmap of nodes. */
    nodesMap: PropTypes.objectOf(nodeShape).isRequired,
    /** Tree representation of nodes. */
    nodesTree: PropTypes.arrayOf(nodeTreeElement).isRequired,
  };

  /**
   * Proxies the onAddNode function.
   *
   * This way, the onAddNode from parent component receives a null
   * value instead of the event from the clicked button.
   */
  onAddRootNode = () => {
    this.props.onAddNode(null);
  };

  /**
   * Renders component.
   *
   * @returns {*} - Component.
   */
  render() {
    const {
      nodesMap,
      nodesTree,
      onAddNode,
      onEditNode,
      onDeleteNode,
    } = this.props;
    return (
      <>
        <NodeList
          nodesMap={nodesMap}
          nodesTree={nodesTree}
          onAddChildNode={onAddNode}
          onEditNode={onEditNode}
          onDeleteNode={onDeleteNode}
        />
        {onAddNode && (
          <Button
            onClick={this.onAddRootNode}
            label={<FormattedMessage {...messages.ADD_NODE} />}
          />
        )}
      </>
    );
  }
}

export default enhancer(NodeManagerList);

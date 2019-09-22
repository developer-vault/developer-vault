import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose, withPropsOnChange } from 'recompose';

import { remove } from 'redux/stores/nodes/actions';
import { getNodesMap, getNodesTree } from 'redux/stores/nodes/selector';
import { nodeShape, nodeTreeElement } from 'react/shapes/node';
import NodeList from 'react/components/nodes/list/NodeList';
import Button from 'react/components/general/button/Button';

import messages from './NodeManagerList.messages';

const enhancer = compose(
  withPropsOnChange(
    ['onAddNode'],
    props => ({
      /**
       * Proxies the onAddNode function.
       *
       * This way, the onAddNode from parent component receives a null
       * value instead of the event from the clicked button.
       */
      onAddRootNode: () => props.onAddNode(null),
    }),
  ),

  connect(state => ({
    nodesTree: getNodesTree(state),
    nodesMap: getNodesMap(state),
  }),
  dispatch => ({
    onDeleteNode: node => dispatch(remove(node)),
  })),
);

const NodeManagerList = ({
  nodesMap,
  nodesTree,
  onAddRootNode,
  onAddNode,
  onEditNode,
  onDeleteNode,
}) => (
  <>
    <h1>List</h1>
    <NodeList
      nodesMap={nodesMap}
      nodesTree={nodesTree}
      onAddChildNode={onAddNode}
      onEditNode={onEditNode}
      onDeleteNode={onDeleteNode}
    />
    <Button
      type="button"
      onClick={onAddRootNode}
      label={<FormattedMessage {...messages.ADD_ROOT_NODE} />}
    />
  </>
);

NodeManagerList.propTypes = {
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

export default enhancer(NodeManagerList);

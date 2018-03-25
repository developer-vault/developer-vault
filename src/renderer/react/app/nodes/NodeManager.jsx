import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { nodeShape } from 'react/shapes/node';
import * as nodeActions from 'redux/stores/nodes/actions';

import NodeManagerList from './nodeList/NodeManagerList';
import PromptNewNodeModal from './editNodeModal/EditNodeModal';

@connect(state => ({
  nodeList: state.nodes,
}))
export default class NodeManager extends React.PureComponent {
  static propTypes = {
    /** @connect / List of nodes in the store. */
    nodeList: PropTypes.objectOf(nodeShape).isRequired,
    /** @connect / Dispatch. */
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    currentlySelectedNode: null,
  };

  /**
   * Creates a new node, pass a parentId if it was given.
   *
   * @param {string} parentId - Id of parent.
   */
  onAddNode = parentId => this.setState({ currentlySelectedNode: { parentId } });

  /**
   * Select the current node.
   *
   * @param {Object} currentlySelectedNode - The node.
   */
  onEditNode = currentlySelectedNode => this.setState({ currentlySelectedNode });

  /**
   * Called when a delete button was pressed.
   *
   * @param {Object} node - Selected node.
   */
  onDeleteNode = (node) => {
    // TODO (sylvainar) : add a reapop confirm.
    this.onDeleteConfirm(node);
  };

  /**
   * Called when user confirmed the deletion.
   *
   * @param {Object} node - Selected node.
   */
  onDeleteConfirm = node => this.props.dispatch(nodeActions.remove(node));

  /**
   * Called when the form is submitted.
   *
   * @param {Object} node - Node.
   */
  onSubmit = (node) => {
    if (node.id) {
      // For an edition.
      this.props.dispatch(nodeActions.update(node));
    } else {
      // For a creation.
      this.props.dispatch(nodeActions.create(node));
    }

    this.onCloseForm();
  };

  /**
   * Cancel node edition / creation, close form.
   */
  onCloseForm = () => this.setState({ currentlySelectedNode: null });

  /** Render component. */
  render() {
    const { currentlySelectedNode } = this.state;
    const { nodeList } = this.props;

    return (
      <React.Fragment>
        <NodeManagerList
          nodeList={nodeList}
          onAddNode={this.onAddNode}
          onEditNode={this.onEditNode}
          onDeleteNode={this.onDeleteNode}
        />
        <PromptNewNodeModal
          node={currentlySelectedNode}
          nodeList={nodeList}
          onSubmit={this.onSubmit}
          onCancel={this.onCloseForm}
        />
      </React.Fragment>
    );
  }
}

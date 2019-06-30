import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { nodeShape } from 'react/shapes/node';
import { create, update, remove } from 'redux/stores/nodes/actions';
import isAuthenticated from 'react/hoc/isAuthenticated';

import NodeManagerList from './nodeList/NodeManagerList';
import PromptNewNodeModal from './editNodeModal/EditNodeModal';

const enhancer = compose(
  isAuthenticated,
  connect(
    state => ({
      nodeList: state.nodes,
    }),
    dispatch => ({
      onCreateNode: node => dispatch(create(node)),
      onUpdateNode: node => dispatch(update(node)),
      onRemoveNode: node => dispatch(remove(node)),
    }),
  ),
);

class NodeManager extends React.PureComponent {
  static propTypes = {
    /** List of nodes in the store. */
    nodeList: PropTypes.objectOf(nodeShape).isRequired,
    /** On node creation. */
    onCreateNode: PropTypes.func.isRequired,
    /** On node edition. */
    onUpdateNode: PropTypes.func.isRequired,
    /** On node deletion. */
    onRemoveNode: PropTypes.func.isRequired,
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
   * @param {object} currentlySelectedNode - The node.
   */
  onEditNode = currentlySelectedNode => this.setState({ currentlySelectedNode });

  /**
   * Called when a delete button was pressed.
   *
   * @param {object} node - Selected node.
   */
  onDeleteNode = (node) => {
    // TODO (sylvainar) : add a reapop confirm.
    this.onDeleteConfirm(node);
  };

  /**
   * Called when user confirmed the deletion.
   *
   * @param {object} node - Selected node.
   */
  onDeleteConfirm = node => this.props.onRemoveNode(node);

  /**
   * Called when the form is submitted.
   *
   * @param {object} node - Node.
   */
  onSubmit = (node) => {
    if (node.id) {
      // For an edition.
      this.props.onUpdateNode(node);
    } else {
      // For a creation.
      this.props.onCreateNode(node);
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

export default enhancer(NodeManager);

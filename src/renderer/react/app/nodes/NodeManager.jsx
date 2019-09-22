import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { create, update } from 'redux/stores/nodes/actions';
import isAuthenticated from 'react/hoc/isAuthenticated';

import NodeManagerList from './nodeList/NodeManagerList';
import EditNodeModal from './editNodeModal/EditNodeModal';

const enhancer = compose(
  isAuthenticated,
  connect(
    null,
    dispatch => ({
      onCreateNode: node => dispatch(create(node)),
      onUpdateNode: node => dispatch(update(node)),
    }),
  ),
);

class NodeManager extends React.PureComponent {
  static propTypes = {
    /** On node creation. */
    onCreateNode: PropTypes.func.isRequired,
    /** On node edition. */
    onUpdateNode: PropTypes.func.isRequired,
  };

  state = {
    currentlySelectedNode: null,
  };

  /**
   * Creates a new node.
   *
   * @param {object} node - Node that was clicked (which is going to become the parent).
   */
  onAddNode = node => this.setState({ currentlySelectedNode: { parentId: node?.id || null } });

  /**
   * Select the current node for edition.
   *
   * @param {object} currentlySelectedNode - The node.
   */
  onEditNode = currentlySelectedNode => this.setState({ currentlySelectedNode });

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

  /** @returns {object} JSX. */
  render() {
    const { currentlySelectedNode } = this.state;

    return (
      <>
        <NodeManagerList
          onAddNode={this.onAddNode}
          onEditNode={this.onEditNode}
        />

        <EditNodeModal
          node={currentlySelectedNode}
          onSubmit={this.onSubmit}
          onCancel={this.onCloseForm}
        />
      </>
    );
  }
}

export default enhancer(NodeManager);

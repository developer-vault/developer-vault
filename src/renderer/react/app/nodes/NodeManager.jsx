import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { create, remove, update } from 'redux/stores/nodes/actions';
import isAuthenticated from 'react/hoc/isAuthenticated';
import { nodeShape } from 'react/shapes/node';
import Button from 'react/components/general/button/Button';

import NodeManagerList from './nodeList/NodeManagerList';
import EditNodeModal from './editNodeModal/EditNodeModal';
import messages from './NodeManager.messages';

const enhancer = compose(
  isAuthenticated,

  connect(
    null,
    dispatch => ({
      onCreateNode: node => dispatch(create(node)),
      onUpdateNode: node => dispatch(update(node)),
      onDeleteNode: node => dispatch(remove(node)),
    }),
  ),

  withStateHandlers(
    {
      locked: true,
      currentlySelectedNode: null,
    },
    {
      toggleLock: ({ locked }) => () => ({ locked: !locked }),
      selectNode: () => node => ({ currentlySelectedNode: node }),
      unselectNode: () => () => ({ currentlySelectedNode: null }),
    },
  ),
);

class NodeManager extends React.PureComponent {
  static propTypes = {
    /** On node creation. */
    onCreateNode: PropTypes.func,
    /** On node edition. */
    onUpdateNode: PropTypes.func,
    /** On node deletion. */
    onDeleteNode: PropTypes.func,

    locked: PropTypes.bool.isRequired,
    toggleLock: PropTypes.func.isRequired,
    selectNode: PropTypes.func.isRequired,
    unselectNode: PropTypes.func.isRequired,
    currentlySelectedNode: PropTypes.shape(nodeShape),
  };

  static defaultProps = {
    onCreateNode: null,
    onUpdateNode: null,
    onDeleteNode: null,
    currentlySelectedNode: null,
  };

  /**
   * Creates a new node.
   *
   * @param {object} node - Node that was clicked (which is going to become the parent).
   */
  onAddNode = node => this.props.selectNode({ parentId: node?.id || null });

  /**
   * Select the current node for edition.
   *
   * @param {object} node - The node.
   */
  onEditNode = node => this.props.selectNode(node);

  /**
   * Called when a delete button was pressed.
   *
   * @param {object} node - Selected node.
   */
  onDeleteNode = (node) => {
    // TODO (sylvainar) : add a reapop confirm.
    this.props.onDeleteNode(node);
  };

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
  onCloseForm = () => this.props.unselectNode();

  /** @returns {object} JSX. */
  render() {
    const { currentlySelectedNode, locked } = this.props;

    return (
      <>
        <NodeManagerList
          onAddNode={!locked && this.onAddNode}
          onEditNode={!locked && this.onEditNode}
          onDeleteNode={!locked && this.onDeleteNode}
        />

        <EditNodeModal
          node={currentlySelectedNode}
          onSubmit={this.onSubmit}
          onCancel={this.onCloseForm}
        />

        <div>
          <Button
            label={
              locked
                ? <FormattedMessage {...messages.UNLOCK} />
                : <FormattedMessage {...messages.LOCK} />
            }
            onClick={this.props.toggleLock}
          />
        </div>
      </>
    );
  }
}

export default enhancer(NodeManager);

import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { FormattedMessage } from 'react-intl';

import { create, remove, update } from 'redux/stores/nodes/actions';
import isAuthenticated from 'react/hoc/isAuthenticated';
import { nodeShape } from 'react/shapes/node';
import Button from 'react/components/general/button/Button';
import { connect } from 'redux/utils';
import messages from 'intl/global.messages';

import NodeManagerList from './nodeList/NodeManagerList';
import EditNodeModal from './editNodeModal/EditNodeModal';

const enhancer = compose(
  isAuthenticated,

  connect(
    null,
    {
      onCreateNode: create,
      onUpdateNode: update,
      onDeleteNode: remove,
    },
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

  withHandlers({
    /**
     * Creates a new node.
     *
     * @param {object} node - Node that was clicked (which is going to become the parent).
     */
    onAddNode: ({ selectNode }) => node => selectNode({ parentId: node?.id || null }),

    /**
     * Select the current node for edition.
     *
     * @param {object} node - The node.
     */
    onEditNode: ({ selectNode }) => node => selectNode(node),

    /**
     * Called when a delete button was pressed.
     *
     * TODO (sylvainar) : add a reapop confirm.
     *
     * @param {object} node - Selected node.
     */
    onDeleteNode: ({ onDeleteNode }) => node => onDeleteNode(node),
  }),

  withHandlers({
    /**
     * Cancel node edition / creation, close form.
     */
    onCloseForm: ({ unselectNode }) => () => unselectNode(),

    /**
     * Called when the form is submitted.
     *
     * @param {object} node - Node.
     */
    onSubmit: ({ unselectNode, onUpdateNode, onCreateNode }) => (node) => {
      if (node.id) {
        // For an edition.
        onUpdateNode(node);
      } else {
        // For a creation.
        onCreateNode(node);
      }

      unselectNode();
    },
  }),
);

const NodeManager = ({
  currentlySelectedNode,
  locked,
  onAddNode,
  onEditNode,
  onDeleteNode,
  onSubmit,
  onCloseForm,
  toggleLock,
}) => (
  <>
    <NodeManagerList
      onAddNode={!locked ? onAddNode : null}
      onEditNode={!locked ? onEditNode : null}
      onDeleteNode={!locked ? onDeleteNode : null}
    />

    <EditNodeModal
      node={currentlySelectedNode}
      onSubmit={onSubmit}
      onCancel={onCloseForm}
    />

    <div>
      <Button
        label={
              locked
                ? <FormattedMessage {...messages.UNLOCK} />
                : <FormattedMessage {...messages.LOCK} />
            }
        onClick={toggleLock}
      />
    </div>
  </>
);

NodeManager.propTypes = {
  currentlySelectedNode: PropTypes.shape(nodeShape),
  locked: PropTypes.bool.isRequired,
  onAddNode: PropTypes.func.isRequired,
  onEditNode: PropTypes.func.isRequired,
  onDeleteNode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
  toggleLock: PropTypes.func.isRequired,
};

NodeManager.defaultProps = {
  currentlySelectedNode: null,
};

export default enhancer(NodeManager);

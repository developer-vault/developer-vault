import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
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

  // Handle lock.
  withStateHandlers(
    {
      locked: true,
    },
    {
      toggleLock: ({ locked }) => () => ({ locked: !locked }),
    },
  ),

  // Handle selector and callbacks.
  withStateHandlers(
    {
      currentlySelectedNode: null,
    },
    {
      // Open the form for creation.
      onAddNode: () => node => ({
        currentlySelectedNode: { parentId: node?.id || null },
      }),

      // Select the current node for edition.
      onEditNode: () => node => ({
        currentlySelectedNode: node,
      }),

      // Called when a delete button was pressed.
      onDeleteNode: ({ currentlySelectedNode }, { onDeleteNode }) => (node) => {
        onDeleteNode(node);
        // Make sure that if we deleted the currentlySelectedNode,
        // we close the form.
        if (currentlySelectedNode?.id === node.id) {
          return { currentlySelectedNode: null };
        }
        return {};
      },

      // Called when the form is dismissed.
      onCloseForm: () => () => ({ currentlySelectedNode: null }),

      // Called when the form is submitted.
      onSubmit: (_, { onUpdateNode, onCreateNode }) => (node) => {
        if (node.id) {
          // For an edition.
          onUpdateNode(node);
        } else {
          // For a creation.
          onCreateNode(node);
        }

        return { currentlySelectedNode: null };
      },
    },
  ),
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

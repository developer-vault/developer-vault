import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose, withPropsOnChange } from 'recompose';

import { nodeShape } from 'react/shapes/node';
import Button from 'react/components/general/button/Button';

import globalMessages from 'intl/global.messages';
import messages from 'intl/nodes.messages';

const enhancer = compose(
  // Can't use withHandlers because we can't check if callbacks are falsy or not.
  // They're replaced by dummy function definitions in recompose internal.
  withPropsOnChange(
    [
      'onAddChildNode',
      'onEditNode',
      'onDeleteNode',
    ],
    ({
      node,
      onAddChildNode,
      onEditNode,
      onDeleteNode,
    }) => ({
      onAddChildNode: onAddChildNode ? () => onAddChildNode(node) : null,
      onEditNode: onEditNode ? () => onEditNode(node) : null,
      onDeleteNode: onDeleteNode ? () => onDeleteNode(node) : null,
    }),
  ),
);

const NodeListElement = ({
  node,
  onAddChildNode,
  onEditNode,
  onDeleteNode,
}) => (
  <div>
    {node.label}
    {onAddChildNode
    && (
    <Button
      onClick={onAddChildNode}
      label={<FormattedMessage {...messages.ADD_CHILD_NODE} />}
    />
    )}

    {onEditNode
    && (
    <Button
      onClick={onEditNode}
      label={<FormattedMessage {...globalMessages.EDIT} />}
    />
    )}

    {onDeleteNode
    && (
    <Button
      onClick={onDeleteNode}
      label={<FormattedMessage {...globalMessages.DELETE} />}
    />
    )}
  </div>
);

NodeListElement.propTypes = {
  /** Current node. */
  node: nodeShape,
  /** Called when "add child" button is clicked. */
  onAddChildNode: PropTypes.func,
  /** Called when "edit" button is clicked. */
  onEditNode: PropTypes.func,
  /** Called when "delete" button is clicked. */
  onDeleteNode: PropTypes.func,
};

NodeListElement.defaultProps = {
  node: null,
  onAddChildNode: null,
  onEditNode: null,
  onDeleteNode: null,
};

export default enhancer(NodeListElement);

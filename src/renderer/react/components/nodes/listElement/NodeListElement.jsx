import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose, withPropsOnChange } from 'recompose';
import cn from 'classnames';

import { nodeShape } from 'react/shapes/node';
import Button from 'react/components/general/button/Button';

import globalMessages from 'intl/global.messages';
import messages from 'intl/nodes.messages';

import classNames from './NodeListElement.module.scss';

const enhancer = compose(
  // Can't use withHandlers because we can't check if callbacks are falsy or not.
  // They're replaced by dummy function definitions in recompose internal.
  withPropsOnChange(
    [
      'onActiveNode',
      'onAddChildNode',
      'onEditNode',
      'onDeleteNode',
    ],
    ({
      node,
      onActiveNode,
      onAddChildNode,
      onEditNode,
      onDeleteNode,
    }) => ({
      onActiveNode: onActiveNode ? () => onActiveNode(node) : null,
      onAddChildNode: onAddChildNode ? () => onAddChildNode(node) : null,
      onEditNode: onEditNode ? () => onEditNode(node) : null,
      onDeleteNode: onDeleteNode ? () => onDeleteNode(node) : null,
    }),
  ),

  withPropsOnChange(
    ['node', 'activeNodeId'],
    ({ node, activeNodeId }) => ({ isActive: activeNodeId === node.id }),
  ),

  React.memo,
);

const NodeListElement = ({
  node,
  isActive,
  onActiveNode,
  onAddChildNode,
  onEditNode,
  onDeleteNode,
}) => (
  <div
    className={cn(
      classNames.element,
      isActive && classNames.active,
    )}
  >
    {node.label}

    {onActiveNode
    && (
      <Button
        onClick={onActiveNode}
        label={<FormattedMessage {...globalMessages.SELECT} />}
      />
    )}

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
  /** This node is the currently active node. */
  isActive: PropTypes.bool.isRequired,
  /** Called when "select" button is clicked. */
  onActiveNode: PropTypes.func,
  /** Called when "add child" button is clicked. */
  onAddChildNode: PropTypes.func,
  /** Called when "edit" button is clicked. */
  onEditNode: PropTypes.func,
  /** Called when "delete" button is clicked. */
  onDeleteNode: PropTypes.func,
};

NodeListElement.defaultProps = {
  node: null,
  onActiveNode: null,
  onAddChildNode: null,
  onEditNode: null,
  onDeleteNode: null,
};

export default enhancer(NodeListElement);

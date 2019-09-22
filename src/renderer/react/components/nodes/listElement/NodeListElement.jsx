import React from 'react';
import PropTypes from 'prop-types';
import { nodeShape } from 'react/shapes/node';
import Button from 'react/components/general/button/Button';
import { FormattedMessage } from 'react-intl';
import { compose, pure, withProps } from 'recompose';
import messages from './NodeListElement.messages';

const enhancer = compose(
  pure,
  withProps(props => ({
    onAddChildNode: props.onAddChildNode ? () => props.onAddChildNode(props.node) : null,
    onEditNode: props.onEditNode ? () => props.onEditNode(props.node) : null,
    onDeleteNode: props.onDeleteNode ? () => props.onDeleteNode(props.node) : null,
  })),
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
    && <Button onClick={onAddChildNode} label={<FormattedMessage {...messages.ADD_CHILD} />} />}

    {onEditNode
    && <Button onClick={onEditNode} label={<FormattedMessage {...messages.EDIT_NODE} />} />}

    {onDeleteNode
    && <Button onClick={onDeleteNode} label={<FormattedMessage {...messages.DELETE_NODE} />} />}
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

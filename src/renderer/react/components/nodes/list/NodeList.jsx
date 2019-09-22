import React from 'react';
import PropTypes from 'prop-types';

import { nodeShape, nodeTreeElement } from 'react/shapes/node';
import NodeListElement from 'react/components/nodes/listElement/NodeListElement';

import classNames from './NodeList.module.scss';

/**
 * Builds the rendering tree of nodes.
 *
 * @param {object[]} treeElements - An array of nodes.
 * @param {object} nodesMap - Nodes hashmap.
 * @param {object} props - Props to propagate.
 * @returns {object} - JSX render.
 */
const renderChildren = (treeElements, nodesMap, props) => (
  <ul className={classNames.listWrapper}>
    {treeElements.map(node => (
      <li key={node.id}>

        {/* Display the node itself. */}
        <NodeListElement
          node={nodesMap[node.id]}
          {...props}
        />

        {/* Then call the function recursively to render this node's children. */}
        {(node.children || []).length > 0
        && renderChildren(
          node.children,
          nodesMap,
          props,
        )}

      </li>
    ))}
  </ul>
);

const NodeList = (props) => {
  const { nodesTree, nodesMap, ...restProps } = props;
  return renderChildren(nodesTree, nodesMap, restProps);
};

NodeList.propTypes = {
  /** Hashmap of nodes. */
  nodesMap: PropTypes.objectOf(nodeShape),
  /** Tree representation of nodes. */
  nodesTree: PropTypes.arrayOf(nodeTreeElement),
};

NodeList.defaultProps = {
  nodesMap: {},
  nodesTree: [],
};

export default React.memo(NodeList);

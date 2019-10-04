import React from 'react';
import PropTypes from 'prop-types';

import { nodeShape, nodeTreeElement } from 'react/shapes/node';
import NodeListElement from 'react/components/nodes/listElement/NodeListElement';

import classNames from './NodeList.module.scss';

const NodeList = ({ nodesTree, nodesMap, ...restProps }) => (
  <ul className={classNames.listWrapper}>
    {nodesTree.map(node => (
      <li key={node.id}>

        {/* Display the node itself. */}
        <NodeListElement
          node={nodesMap[node.id]}
          {...restProps}
        />

        {/* Then call the function recursively to render this node's children. */}
        {(node.children || []).length > 0
          && (
            <NodeList
              nodesTree={node.children}
              nodesMap={nodesMap}
              {...restProps}
            />
          )}
      </li>
    ))}
  </ul>
);

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

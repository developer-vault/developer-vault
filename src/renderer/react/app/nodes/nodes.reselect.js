import memoize from 'memoize-one';
import { buildTree } from 'services/node';

// eslint-disable-next-line import/prefer-default-export
export const memoizedBuildTree = memoize(buildTree);

import {
  create,
  buildTree,
  listAllElementIdsInSubtree,
  fetchChildrenRecursively,
  listDescendants,
  deleteSubTree,
  getEligibleNewParents,
} from './index';

describe('Node service', () => {
  const nodes = {
    node1: {
      id: 'node1',
      parentId: null,
    },
    node2: {
      id: 'node2',
      parentId: null,
    },
    node11: {
      id: 'node11',
      parentId: 'node1',
    },
    node12: {
      id: 'node12',
      parentId: 'node1',
    },
    node121: {
      id: 'node121',
      parentId: 'node12',
    },
    node122: {
      id: 'node122',
      parentId: 'node12',
    },
  };

  it('create', () => {
    const node = { label: 'node1' };

    expect(create(node)).toMatchObject({
      id: 'generatedTestValue',
      label: 'node1',
    });
  });

  it('buildTree', () => {
    expect(buildTree(nodes)).toMatchObject([
      {
        id: 'node1',
        parentId: null,
        children: [
          {
            id: 'node11',
            parentId: 'node1',
            children: [],
          },
          {
            id: 'node12',
            parentId: 'node1',
            children: [
              {
                id: 'node121',
                parentId: 'node12',
                children: [],
              },
              {
                id: 'node122',
                parentId: 'node12',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'node2',
        parentId: null,
        children: [],
      },
    ]);
  });

  it('listAllElementIdsInSubtree', () => {
    const treeFromNode1 = fetchChildrenRecursively('node1', nodes);
    expect(listAllElementIdsInSubtree(treeFromNode1)).toMatchObject(['node11', 'node12', 'node121', 'node122']);
  });

  it('listDescendants', () => {
    expect(listDescendants('node1', nodes)).toMatchObject(['node11', 'node12', 'node121', 'node122']);
  });

  it('deleteSubTree', () => {
    const result = deleteSubTree('node12', nodes);
    expect(result).toMatchObject({
      node1: {
        id: 'node1',
        parentId: null,
      },
      node2: {
        id: 'node2',
        parentId: null,
      },
      node11: {
        id: 'node11',
        parentId: 'node1',
      },
    });
    expect(Object.values(result)).toHaveLength(3);
  });

  it('getEligibleNewParents', () => {
    expect(getEligibleNewParents('', nodes)).toHaveLength(6);
    expect(getEligibleNewParents('node12', nodes)).toEqual(['node1', 'node2', 'node11']);
  });
});

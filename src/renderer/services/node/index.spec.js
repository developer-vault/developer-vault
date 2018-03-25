import { create, buildTree } from './index';

describe('Node service', () => {
  it('create', () => {
    const node = { label: 'node1' };

    expect(create(node)).toMatchObject({
      generatedTestValue: {
        label: 'node1',
      },
    });
  });

  it('buildTree', () => {
    /*
     * node1
     * - node11
     * - node12
     * -- node121
     * -- node122
     * node2
     */
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
});

import {
  create,
  buildTree,
  listAllElementIdsInSubtree,
  fetchChildrenRecursively,
  listDescendants,
  deleteSubTree,
  getEligibleNewParents,
  addModuleOnNode,
  editModuleOnNode,
  deleteModuleOnNode,
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

  describe('crud', () => {
    it('create', () => {
      const node = { label: 'node1' };

      expect(create(node)).toMatchObject({
        id: 'generatedTestValue',
        label: 'node1',
      });
    });
  });
  describe('tree management', () => {
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

  describe('module management', () => {
    describe('addModuleOnNode', () => {
      it('simple case', () => {
        const node = {
          id: 'n1',
          modules: {},
        };

        const module = {
          type: 't1',
          name: 'Hello World!',
          options: { yolo: 'swag' },
        };

        expect(addModuleOnNode(node, module)).toEqual({
          id: 'n1',
          modules: {
            generatedTestValue: {
              id: 'generatedTestValue',
              type: 't1',
              name: 'Hello World!',
              options: { yolo: 'swag' },
              data: {},
            },
          },
        });
      });

      it('no options', () => {
        const node = {
          id: 'n1',
          modules: {},
        };

        const module = {
          type: 't1',
          name: 'Hello World!',
        };

        expect(addModuleOnNode(node, module)).toEqual({
          id: 'n1',
          modules: {
            generatedTestValue: {
              id: 'generatedTestValue',
              type: 't1',
              name: 'Hello World!',
              options: {},
              data: {},
            },
          },
        });
      });

      it('keeps already existing modules', () => {
        const node = {
          id: 'n1',
          modules: {
            m1: {
              id: 'm1',
              type: 't1',
              name: 'Hello World!',
              options: {},
              data: {},
            },
          },
        };

        const module = {
          type: 't1',
          name: 'Hello World!',
          options: { yolo: 'swag' },
        };

        expect(addModuleOnNode(node, module)).toEqual({
          id: 'n1',
          modules: {
            m1: {
              id: 'm1',
              type: 't1',
              name: 'Hello World!',
              options: {},
              data: {},
            },
            generatedTestValue: {
              id: 'generatedTestValue',
              type: 't1',
              name: 'Hello World!',
              options: { yolo: 'swag' },
              data: {},
            },
          },
        });
      });
    });

    describe('editModuleOnNode', () => {
      it('edit module without destroying data', () => {
        const node = {
          id: 'n1',
          modules: {
            m1: {
              id: 'm1',
              type: 't1',
              name: 'Hello World!',
              options: {},
              data: {
                hello: 'there',
                general: 'kenobi',
              },
            },
          },
        };

        const module = {
          id: 'm1',
          name: 'New Name!',
          options: { yolo: 'swag' },
          data: {
            thisShouldBe: 'ignored for safety reasons',
            ofCourseWe: 'are modifying module installation options',
            whichShouldNot: 'impact on module data',
          },
          type: "that too, we're not supposed to change module type afterwards",
        };

        expect(editModuleOnNode(node, module)).toEqual({
          id: 'n1',
          modules: {
            m1: {
              id: 'm1',
              type: 't1',
              name: 'New Name!',
              options: { yolo: 'swag' },
              data: {
                hello: 'there',
                general: 'kenobi',
              },
            },
          },
        });
      });
    });

    describe('deleteModuleOnNode', () => {
      it('deletes module and its data', () => {
        const node = {
          id: 'n1',
          modules: {
            m1: {
              id: 'm1',
              type: 't1',
              name: 'Hello World!',
              options: {},
              data: {
                hello: 'there',
                general: 'kenobi',
              },
            },
            m2: {
              id: 'm2',
              type: 't2',
              name: 'Hello World!',
              options: {},
              data: {
                hello: 'there',
                general: 'kenobi',
              },
            },
          },
        };

        const moduleId = 'm1';

        expect(deleteModuleOnNode(node, moduleId)).toEqual({
          id: 'n1',
          modules: {
            m2: {
              id: 'm2',
              type: 't2',
              name: 'Hello World!',
              options: {},
              data: {
                hello: 'there',
                general: 'kenobi',
              },
            },
          },
        });
      });
    });
  });
});

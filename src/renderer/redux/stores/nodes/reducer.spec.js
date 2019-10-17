import reducer from './reducer';
import {
  create,
  update,
  remove,
  addModule,
  editModule,
  deleteModule,
} from './actions';

describe('Reducer: nodes', () => {
  it('create', () => {
    const action = create({ label: 'node1' });
    expect(reducer({}, action)).toMatchObject({
      generatedTestValue: {
        label: 'node1',
        id: 'generatedTestValue',
      },
    });
  });

  it('update', () => {
    const initialState = { node1: { label: 'label1' } };
    const action = update({ id: 'node1', label: 'label2' });

    expect(reducer(initialState, action)).toMatchObject({ node1: { label: 'label2' } });
  });

  it('remove', () => {
    const initialState = { node1: { id: 'node1', label: 'label1' }, node2: { id: 'node2', label: 'label2' } };
    const action = remove({ id: 'node1' });
    const result = reducer(initialState, action);

    expect(result).toMatchObject({ node2: { id: 'node2', label: 'label2' } });
    expect(Object.values(result)).toHaveLength(1);
  });

  it('addModule', () => {
    const initialState = { node1: { id: 'node1', label: 'label1' }, node2: { id: 'node2', label: 'label2' } };
    const moduleOptions = { yolo: 'swag' };
    const action = addModule(
      'node2',
      {
        type: 'helloWordModule',
        name: 'My Hello World',
        options: moduleOptions,
      },
    );
    const result = reducer(initialState, action);

    expect(result).toEqual({
      node1: { id: 'node1', label: 'label1' },
      node2: {
        id: 'node2',
        label: 'label2',
        modules: {
          generatedTestValue: {
            id: 'generatedTestValue',
            type: 'helloWordModule',
            name: 'My Hello World',
            options: { yolo: 'swag' },
            data: {},
          },
        },
      },
    });
  });

  it('editModule', () => {
    const initialState = {
      node1: { id: 'node1', label: 'label1' },
      node2: {
        id: 'node2',
        label: 'label2',
        modules: {
          generatedTestValue: {
            id: 'generatedTestValue',
            type: 'helloWordModule',
            name: 'My Hello World',
            options: { yolo: 'swag' },
            data: { the: 'data' },
          },
          m2: {
            id: 'm2',
            type: 'helloWordModule',
            name: 'My Hello World',
            options: { yolo: 'swag' },
            data: {},
          },
        },
      },
    };

    const action = editModule(
      'node2',
      {
        id: 'generatedTestValue',
        name: 'New name',
        options: {
          pouet: 'plop',
        },
      },
    );
    const result = reducer(initialState, action);

    expect(result).toEqual({
      node1: { id: 'node1', label: 'label1' },
      node2: {
        id: 'node2',
        label: 'label2',
        modules: {
          generatedTestValue: {
            id: 'generatedTestValue',
            type: 'helloWordModule',
            name: 'New name',
            options: { pouet: 'plop' },
            data: { the: 'data' },
          },
          m2: {
            id: 'm2',
            type: 'helloWordModule',
            name: 'My Hello World',
            options: { yolo: 'swag' },
            data: {},
          },
        },
      },
    });
  });

  it('deleteModule', () => {
    const initialState = {
      node1: { id: 'node1', label: 'label1' },
      node2: {
        id: 'node2',
        label: 'label2',
        modules: {
          m1: {
            id: 'm1',
            type: 'helloWordModule',
            name: 'New name',
            options: { pouet: 'plop' },
            data: { the: 'data' },
          },
          m2: {
            id: 'm2',
            type: 'helloWordModule',
            name: 'My Hello World',
            options: { yolo: 'swag' },
            data: {},
          },
        },
      },
    };

    const action = deleteModule('node2', 'm2');

    const result = reducer(initialState, action);

    expect(result).toEqual({
      node1: { id: 'node1', label: 'label1' },
      node2: {
        id: 'node2',
        label: 'label2',
        modules: {
          m1: {
            id: 'm1',
            type: 'helloWordModule',
            name: 'New name',
            options: { pouet: 'plop' },
            data: { the: 'data' },
          },
        },
      },
    });
  });
});

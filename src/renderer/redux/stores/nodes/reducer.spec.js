import { create, update, remove } from './actions';
import reducer from './reducer';

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
});

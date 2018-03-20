import { create, update, remove } from './actions';
import reducer from './reducer';

describe('Reducer: nodes', () => {
  it('create', () => {
    const action = create({ label: 'node1' });
    expect(reducer({}, action)).toMatchObject({
      generatedTestValue: {
        label: 'node1',
      },
    });
  });

  it('update', () => {
    const initialState = { node1: { label: 'label1' } };
    const action = update('node1', { label: 'label2' });

    expect(reducer(initialState, action)).toMatchObject({ node1: { label: 'label2' } });
  });

  it('remove', () => {
    const initialState = { node1: { label: 'label1' }, node2: { label: 'label2' } };
    const action = remove('node1');

    expect(reducer(initialState, action)).toMatchObject({ node2: { label: 'label2' } });
  });
});

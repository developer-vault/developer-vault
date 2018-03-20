import { create } from './index';

// jest.mock('uuid/v4');

describe('Node service', () => {
  it('create', () => {
    const node = { label: 'node1' };

    expect(create(node)).toMatchObject({
      generatedTestValue: {
        label: 'node1',
      },
    });
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import executeSubmit from './executeSubmit';
import { Values } from '../../types';

describe('executeSubmit', () => {
  const dispatch = jest.fn().mockResolvedValue({});
  const getStore = jest.fn().mockReturnValue({});
  const callbacks = { validateField: jest.fn(), onSubmit: jest.fn() };

  beforeEach(() => jest.clearAllMocks());

  it('should call onSubmit if there are no errors', async () => {
    getStore.mockReturnValue({ values: { a: 1 }, errors: {} });
    await executeSubmit<Values>()(dispatch, getStore, callbacks as any);
    expect(getStore).toHaveBeenCalledTimes(1);
    expect(callbacks.onSubmit).toHaveBeenCalledTimes(1);
    expect(callbacks.onSubmit).toHaveBeenCalledWith({ a: 1 });
  });

  it('should skip submission if there are errors', async () => {
    getStore.mockReturnValue({ values: { a: 1 }, errors: { a: 'some error' } });
    await executeSubmit<Values>()(dispatch, getStore, callbacks as any);
    expect(getStore).toHaveBeenCalledTimes(1);
    expect(callbacks.onSubmit).toHaveBeenCalledTimes(0);
  });
});

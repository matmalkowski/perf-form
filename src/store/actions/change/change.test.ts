/* eslint-disable @typescript-eslint/no-explicit-any */
import { executeChange, executeBlur } from '.';
import { Values } from '../../types';
import { setFieldTouched, setFieldValue } from '../field';
import { executeValidateForm } from '../validation';

jest.mock('../field');
jest.mock('../validation');

const setFieldValueMock = setFieldValue as jest.Mock;
setFieldValueMock.mockReturnValue('setFieldValue');
const setFieldTouchedMock = setFieldTouched as jest.Mock;
setFieldTouchedMock.mockReturnValue('setFieldTouched');
const executeValidateFormMock = executeValidateForm as jest.Mock;
executeValidateFormMock.mockReturnValue('executeValidateForm');

describe('executeChange', () => {
  const dispatch = jest.fn().mockResolvedValue({});
  const getStore = jest.fn().mockReturnValue({});
  const callbacks = { validateField: jest.fn(), onSubmit: jest.fn() };

  beforeEach(() => jest.clearAllMocks());

  it('should call setFieldValue', async () => {
    executeChange<Values>('key', 'newValue')(dispatch, getStore, callbacks as any);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('setFieldValue');

    expect(setFieldValue).toHaveBeenCalledWith('key', 'newValue');
  });

  it('should call executeValidateForm if validateOnChange is true', async () => {
    getStore.mockReturnValue({ validateOnChange: true });

    await executeChange<Values>('key', 'newValue')(dispatch, getStore, callbacks as any);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, 'setFieldValue');
    expect(dispatch).toHaveBeenNthCalledWith(2, 'executeValidateForm');
    expect(executeValidateForm).toHaveBeenCalledWith('key');
  });
});

describe('executeBlur', () => {
  const dispatch = jest.fn().mockResolvedValue({});
  const getStore = jest.fn().mockReturnValue({});
  const callbacks = { validateField: jest.fn(), onSubmit: jest.fn() };

  beforeEach(() => jest.clearAllMocks());

  it('should call setFieldTouched', async () => {
    executeBlur<Values>('key')(dispatch, getStore, callbacks as any);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('setFieldTouched');

    expect(setFieldTouched).toHaveBeenCalledWith('key', true);
  });

  it('should call executeValidateForm if validateOnBlur is true', async () => {
    getStore.mockReturnValue({ validateOnBlur: true });

    await executeBlur<Values>('key')(dispatch, getStore, callbacks as any);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, 'setFieldTouched');
    expect(dispatch).toHaveBeenNthCalledWith(2, 'executeValidateForm');
    expect(executeValidateForm).toHaveBeenCalledWith('key');
  });
});

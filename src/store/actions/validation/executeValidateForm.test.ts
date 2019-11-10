/* eslint-disable @typescript-eslint/no-explicit-any */
import runFieldLevelValidations from '../../../validation/runFieldLevelValidations';
import runValidationHandler from '../../../validation/runValidationHandler';
import { setFieldError, setErrors } from '../field';
import { Values } from '../../types';
import { executeValidateForm } from '.';

jest.mock('../../../validation/runFieldLevelValidations');
jest.mock('../../../validation/runValidationHandler');
jest.mock('../field');

const runFieldLevelValidationsMock = runFieldLevelValidations as jest.Mock;
runFieldLevelValidationsMock.mockResolvedValue([]);
const runValidationHandlerMock = runValidationHandler as jest.Mock;
runValidationHandlerMock.mockResolvedValue({});
const setFieldErrorMock = setFieldError as jest.Mock;
const setErrorsMock = setErrors as jest.Mock;
setErrorsMock.mockReturnValue('setErrors');

describe('executeValidateForm', () => {
  const dispatch = jest.fn().mockResolvedValue({});
  const getStore = jest.fn().mockReturnValue({ values: { a: 1 } });
  const callbacks = { validateField: 'validateField', validateForm: 'validateForm' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call all dispatch methods in order', async () => {
    await executeValidateForm<Values>()(dispatch, getStore, callbacks as any);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SET_IS_VALIDATING', payload: { isValidating: true } });
    expect(dispatch).toHaveBeenNthCalledWith(2, 'setErrors');
    expect(dispatch).toHaveBeenNthCalledWith(3, { type: 'SET_IS_VALIDATING', payload: { isValidating: false } });
  });

  it('should call runFieldLevelValidations with validateField and values payload', async () => {
    await executeValidateForm<Values>()(dispatch, getStore, callbacks as any);
    expect(runFieldLevelValidationsMock).toHaveBeenCalledWith({ a: 1 }, 'validateField');
  });

  it('should call runValidationHandler with validateForm and values payload', async () => {
    await executeValidateForm<Values>()(dispatch, getStore, callbacks as any);
    expect(runValidationHandlerMock).toHaveBeenCalledWith({ a: 1 }, 'validateForm');
  });

  it('should call setErrors with errors from field level validators', async () => {
    runFieldLevelValidationsMock.mockResolvedValue([{ a: 'some error' }, { b: 'another error' }]);
    await executeValidateForm<Values>()(dispatch, getStore, callbacks as any);
    expect(setErrorsMock).toHaveBeenCalledWith({ a: 'some error', b: 'another error' });
  });

  it('should call setErrors with errors from form level validators', async () => {
    runFieldLevelValidationsMock.mockResolvedValue([]);
    runValidationHandlerMock.mockResolvedValue({ c: 'waaat', d: 'wrong!' });
    await executeValidateForm<Values>()(dispatch, getStore, callbacks as any);
    expect(setErrorsMock).toHaveBeenCalledWith({ c: 'waaat', d: 'wrong!' });
  });

  it('should call setErrors with combined errors', async () => {
    runFieldLevelValidationsMock.mockResolvedValue([{ a: 'some error' }, { b: 'another error' }]);
    runValidationHandlerMock.mockResolvedValue({ c: 'waaat', d: 'wrong!' });
    await executeValidateForm<Values>()(dispatch, getStore, callbacks as any);
    expect(setErrorsMock).toHaveBeenCalledWith({
      a: 'some error', b: 'another error', c: 'waaat', d: 'wrong!'
    });
  });

  it('should call setFieldErrorMock with field errors when scoped validation is on', async () => {
    runFieldLevelValidationsMock.mockResolvedValue([]);
    runValidationHandlerMock.mockResolvedValue({ c: 'waaat', d: 'wrong!' });
    await executeValidateForm<Values>('d')(dispatch, getStore, callbacks as any);
    expect(setFieldErrorMock).toHaveBeenCalledWith('d', 'wrong!');
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  submitAttempt, submitFinish, submitForm
} from '.';
import { Values } from '../../types';
import { executeValidateForm } from '../validation';

jest.mock('../field');
jest.mock('../validation');

const executeValidateFormMock = executeValidateForm as jest.Mock;
executeValidateFormMock.mockReturnValue('executeValidateForm');

describe('submitAttempt', () => {
  it('should create action', () => {
    const result = submitAttempt();
    expect(result).toStrictEqual({ type: 'SUBMIT_ATTEMPT' });
  });
});

describe('submitFinish', () => {
  it('should create action', () => {
    const result = submitFinish();
    expect(result).toStrictEqual({ type: 'SUBMIT_FINISH' });
  });
});

describe('submitForm', () => {
  const dispatch = jest.fn().mockResolvedValue({});
  const getStore = jest.fn().mockReturnValue({});
  const callbacks = { validateField: jest.fn(), onSubmit: jest.fn() };

  beforeEach(() => jest.clearAllMocks());

  it('should call all dispatch methods in order', async () => {
    await submitForm<Values>()(dispatch, getStore, callbacks as any);
    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SUBMIT_ATTEMPT' });
    expect(dispatch).toHaveBeenNthCalledWith(2, 'executeValidateForm');
    expect(dispatch).toHaveBeenNthCalledWith(4, { type: 'SUBMIT_FINISH' });
    expect(executeValidateForm).toHaveBeenCalled();
  });
});

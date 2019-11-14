/* eslint-disable @typescript-eslint/no-explicit-any */
import reducer from './reducer';
import {
  setFieldValue, setFieldTouched, setErrors, setFieldError
} from './actions/field';
import { setIsValidating } from './actions/validation';
import { submitAttempt, submitFinish } from './actions/submit';

describe('reducer should handle', () => {
  const initialState = {
    values: {
      a: '',
      b: ''
    },
    touched: {},
    errors: {},
    isSubmitting: false,
    isValidating: false,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false
  };

  it('SET_FIELD_VALUE action', () => {
    const nextState = reducer(initialState, setFieldValue('a', 'nextValue'));
    expect(nextState).toStrictEqual({
      values: {
        a: 'nextValue',
        b: ''
      },
      touched: {},
      errors: {},
      isSubmitting: false,
      isValidating: false,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false
    });
  });

  it('SET_FIELD_TOUCHED action', () => {
    const nextState = reducer(initialState, setFieldTouched('a', true));
    expect(nextState).toStrictEqual({
      values: {
        a: '',
        b: ''
      },
      touched: {
        a: true
      },
      errors: {},
      isSubmitting: false,
      isValidating: false,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false
    });
  });

  it('SET_ERRORS action', () => {
    const nextState = reducer(initialState, setErrors({ a: 'errorForA', b: 'errorForB' }));
    expect(nextState).toStrictEqual({
      values: {
        a: '',
        b: ''
      },
      touched: {},
      errors: { a: 'errorForA', b: 'errorForB' },
      isSubmitting: false,
      isValidating: false,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false
    });
  });

  it('SET_FIELD_ERROR action', () => {
    const nextState = reducer(initialState, setFieldError('a', 'error'));
    expect(nextState).toStrictEqual({
      values: {
        a: '',
        b: ''
      },
      touched: {},
      errors: { a: 'error' },
      isSubmitting: false,
      isValidating: false,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false
    });
  });

  it('SET_IS_VALIDATING action', () => {
    const nextState = reducer(initialState, setIsValidating(true));
    expect(nextState).toStrictEqual({
      values: {
        a: '',
        b: ''
      },
      touched: {},
      errors: {},
      isSubmitting: false,
      isValidating: true,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false
    });
  });

  it('SUBMIT_ATTEMPT action', () => {
    const nextState = reducer(initialState, submitAttempt());
    expect(nextState).toStrictEqual({
      values: {
        a: '',
        b: ''
      },
      touched: {
        a: true,
        b: true
      },
      errors: {},
      isSubmitting: true,
      isValidating: false,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false
    });
  });

  it('SUBMIT_FINISH action', () => {
    const prevState = {
      values: {
        a: '',
        b: ''
      },
      touched: {
        a: true,
        b: true
      },
      errors: {},
      isSubmitting: true,
      isValidating: false,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false
    };
    const nextState = reducer(prevState, submitFinish());
    expect(nextState).toStrictEqual({
      values: {
        a: '',
        b: ''
      },
      touched: {
        a: true,
        b: true
      },
      errors: {},
      isSubmitting: false,
      isValidating: false,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnMount: false
    });
  });

  it('default', () => {
    const nextState = reducer(initialState, { type: 'unknown' } as any);
    expect(nextState).toStrictEqual(initialState);
  });
});

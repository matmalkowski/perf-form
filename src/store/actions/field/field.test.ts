import {
  setFieldValue, setFieldTouched, setFieldError, setErrors
} from '.';
import { Values } from '../../types';

describe('field actions creators should create correct actions for', () => {
  it('setFieldValue', () => {
    const result = setFieldValue<Values>('testKey', 'some Value');
    expect(result).toStrictEqual({
      type: 'SET_FIELD_VALUE',
      payload: {
        field: 'testKey',
        value: 'some Value'
      }
    });
  });

  it('setFieldTouched', () => {
    const result = setFieldTouched<Values>('testKey', true);
    expect(result).toStrictEqual({
      type: 'SET_FIELD_TOUCHED',
      payload: {
        field: 'testKey',
        touched: true
      }
    });
  });

  it('setFieldError', () => {
    const result = setFieldError<Values>('testKey', 'Some error');
    expect(result).toStrictEqual({
      type: 'SET_FIELD_ERROR',
      payload: {
        field: 'testKey',
        error: 'Some error'
      }
    });
  });

  it('setErrors', () => {
    const result = setErrors<Values>({ key1: 'some error', key2: 'another one!' });
    expect(result).toStrictEqual({
      type: 'SET_ERRORS',
      payload: {
        errors: { key1: 'some error', key2: 'another one!' }
      }
    });
  });
});

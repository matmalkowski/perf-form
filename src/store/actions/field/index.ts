import {
  SetFieldValueAction, SET_FIELD_VALUE, SetFieldTouchedAction, SET_FIELD_TOUCHED,
  SetFieldErrorAction, SET_FIELD_ERROR, SetErrorsAction, SET_ERRORS
} from './types';
import { Errors } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setFieldValue = <TValues>(field: keyof TValues, value?: any):
SetFieldValueAction<TValues> =>
  ({ type: SET_FIELD_VALUE, payload: { field, value } });

export const setFieldTouched = <TValues>(field: keyof TValues, touched: boolean):
SetFieldTouchedAction<TValues> =>
  ({ type: SET_FIELD_TOUCHED, payload: { field, touched } });

export const setFieldError = <TValues>(field: keyof TValues, error?: string):
SetFieldErrorAction<TValues> =>
  ({ type: SET_FIELD_ERROR, payload: { field, error } });

export const setErrors = <TValues>(errors: Errors<TValues>):
SetErrorsAction<TValues> =>
  ({ type: SET_ERRORS, payload: { errors } });

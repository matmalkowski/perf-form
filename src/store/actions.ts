/* eslint-disable import/no-cycle */
import { Errors } from '../types';
import { ThunkAction, ThunkDecorator } from './types';

type Action<T> = {
  type: T,
}

// -----------------------------------------------------------------------------

export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export interface SetFieldValueAction<TValues> extends Action<typeof SET_FIELD_VALUE> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { field: keyof TValues; value?: any };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setFieldValue = <TValues>(field: keyof TValues, value?: any):
SetFieldValueAction<TValues> =>
  ({ type: SET_FIELD_VALUE, payload: { field, value } });

// -----------------------------------------------------------------------------

export const SET_FIELD_TOUCHED = 'SET_FIELD_TOUCHED';
export interface SetFieldTouchedAction<TValues> extends Action<typeof SET_FIELD_TOUCHED> {
  payload: { field: keyof TValues; touched: boolean };
}
export const setFieldTouched = <TValues>(field: keyof TValues, touched: boolean):
SetFieldTouchedAction<TValues> =>
  ({ type: SET_FIELD_TOUCHED, payload: { field, touched } });

// -----------------------------------------------------------------------------

export const SET_FIELD_ERROR = 'SET_FIELD_ERROR';
export interface SetFieldErrorAction<TValues> extends Action<typeof SET_FIELD_ERROR> {
  payload: { field: keyof TValues; error?: string };
}
export const setFieldError = <TValues>(field: keyof TValues, error?: string):
SetFieldErrorAction<TValues> =>
  ({ type: SET_FIELD_ERROR, payload: { field, error } });

// -----------------------------------------------------------------------------

export const SET_ERRORS = 'SET_ERRORS';
export interface SetErrorsAction<TValues> extends Action<typeof SET_ERRORS> {
  payload: { errors: Errors<TValues> };
}
export const setErrors = <TValues>(errors: Errors<TValues>):
SetErrorsAction<TValues> =>
  ({ type: SET_ERRORS, payload: { errors } });

// -----------------------------------------------------------------------------

export const SET_IS_VALIDATING = 'SET_IS_VALIDATING';
export interface SetIsValidatingAction extends Action<typeof SET_IS_VALIDATING> {
  payload: { isValidating: boolean };
}
export const setIsValidating = (isValidating: boolean):
SetIsValidatingAction =>
  ({ type: SET_IS_VALIDATING, payload: { isValidating } });

// -----------------------------------------------------------------------------


export const validateForm = <TValues>(scopeField?: keyof TValues): ThunkAction<TValues, ThunkDecorator<TValues>> =>
  (dispatch, getState, { validation }) => {
    if (validation.validateForm) {
      const { values } = getState();
      // dispatch(setIsValidating(true));
      const results = validation.validateForm(values) || {} as Errors<TValues>;
      console.debug('gonna validate those:', values);
      console.debug('validation results', results);
      if (scopeField) {
        dispatch(setFieldError(scopeField, results[scopeField]));
      } else {
        dispatch(setErrors(results));
      }

      // dispatch(setIsValidating(false));
    }
  };

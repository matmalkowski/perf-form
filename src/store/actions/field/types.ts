import { Action, Errors } from '../../types';

export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export interface SetFieldValueAction<TValues> extends Action<typeof SET_FIELD_VALUE> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { field: keyof TValues; value?: any };
}

export const SET_FIELD_TOUCHED = 'SET_FIELD_TOUCHED';
export interface SetFieldTouchedAction<TValues> extends Action<typeof SET_FIELD_TOUCHED> {
  payload: { field: keyof TValues; touched: boolean };
}

export const SET_FIELD_ERROR = 'SET_FIELD_ERROR';
export interface SetFieldErrorAction<TValues> extends Action<typeof SET_FIELD_ERROR> {
  payload: { field: keyof TValues; error?: string };
}

export const SET_ERRORS = 'SET_ERRORS';
export interface SetErrorsAction<TValues> extends Action<typeof SET_ERRORS> {
  payload: { errors: Errors<TValues> };
}

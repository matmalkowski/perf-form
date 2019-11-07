import { Thunk } from '../../types';
import { setFieldTouched, setFieldValue } from '../field';
import { executeValidateForm } from '../validation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeChange = <TValues>(field: keyof TValues, value?: any): Thunk<TValues> =>
  async (dispatch, getState) => {
    const { validateOnChange } = getState();

    await dispatch(setFieldValue(field, value));
    if (validateOnChange) {
      return dispatch(executeValidateForm(field));
    } return Promise.resolve();
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeBlur = <TValues>(field: keyof TValues): Thunk<TValues> =>
  async (dispatch, getState) => {
    const { validateOnBlur } = getState();

    await dispatch(setFieldTouched(field, true));
    if (validateOnBlur) {
      return dispatch(executeValidateForm(field));
    } return Promise.resolve();
  };

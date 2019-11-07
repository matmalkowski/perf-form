import { Thunk } from '../../types';
import { setFieldTouched, setFieldValue } from '../field';
import { executeValidateForm } from '../validation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeChange = <TValues>(field: keyof TValues, value?: any): Thunk<TValues> =>
  (dispatch, getState) => {
    const { validateOnChange } = getState();

    return dispatch(setFieldValue(field, value)).then(() => {
      if (validateOnChange) {
        return dispatch(executeValidateForm(field));
      } return Promise.resolve();
    });
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeBlur = <TValues>(field: keyof TValues): Thunk<TValues> =>
  (dispatch, getState) => {
    const { validateOnBlur } = getState();

    return dispatch(setFieldTouched(field, true)).then(() => {
      if (validateOnBlur) {
        return dispatch(executeValidateForm(field));
      } return Promise.resolve();
    });
  };

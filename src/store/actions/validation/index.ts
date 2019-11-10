import SET_IS_VALIDATING, { SetIsValidatingAction } from './types';
import { Thunk } from '../../types';
import runFieldLevelValidations from '../../../validation/runFieldLevelValidations';
import runValidationHandler from '../../../validation/runValidationHandler';
import { setFieldError, setErrors } from '../field';

export const setIsValidating = (isValidating: boolean):
SetIsValidatingAction =>
  ({ type: SET_IS_VALIDATING, payload: { isValidating } });

export const executeValidateForm = <TValues>(scopeField?: keyof TValues): Thunk<TValues> =>
  async (dispatch, getState, { validateField, validateForm }) => {
    const { values } = getState();
    await dispatch(setIsValidating(true));
    const [fieldLevelErrorsArray, formLevelErrors] = await Promise.all([
      runFieldLevelValidations(values, validateField),
      runValidationHandler(values, validateForm)
    ]);
    const fieldLevelErrors = fieldLevelErrorsArray.reduce((acc, e) => ({ ...acc, ...e }), {});
    const errors = {
      ...fieldLevelErrors,
      ...formLevelErrors
    };
    if (scopeField) {
      await dispatch(setFieldError(scopeField, errors[scopeField]));
    } else {
      await dispatch(setErrors(errors));
    }

    return dispatch(setIsValidating(false));
  };

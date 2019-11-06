import SET_IS_VALIDATING, { SetIsValidatingAction } from './types';
import { Thunk } from '../../types';
import runFieldLevelValidations from '../../../validation/runFieldLevelValidations';
import runValidationHandler from '../../../validation/runValidationHandler';
import { setFieldError, setErrors } from '../field';

export const setIsValidating = (isValidating: boolean):
SetIsValidatingAction =>
  ({ type: SET_IS_VALIDATING, payload: { isValidating } });

export const executeValidateForm = <TValues>(scopeField?: keyof TValues): Thunk<TValues> =>
  (dispatch, getState, { validateField, validateForm }) => {
    const { values } = getState();
    return dispatch(setIsValidating(true)).then(() => Promise.all([
      runFieldLevelValidations(values, validateField),
      runValidationHandler(values, validateForm)
    ]).then(allErrors => {
      const [fieldLevelErrorsArray, formLevelErrors] = allErrors;
      const fieldLevelErrors = fieldLevelErrorsArray.reduce((acc, e) => ({ ...acc, ...e }), {});
      const errors = {
        ...fieldLevelErrors,
        ...formLevelErrors
      };
      const dispatchedErrors = scopeField
        ? dispatch(setFieldError(scopeField, errors[scopeField]))
        : dispatch(setErrors(errors));
      return dispatchedErrors.then(() => dispatch(setIsValidating(false)));
    }));
  };

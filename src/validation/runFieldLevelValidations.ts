import { isFunction } from 'util';
import runFieldValidationHandler from './runFieldValidationHandler';
import { FieldValidators } from '../store/types';

const runFieldLevelValidations = <TValues>(values: TValues, fieldValidators: FieldValidators<TValues>) => {
  const fieldsToValidate = Object.keys(fieldValidators)
    .filter(f => isFunction(fieldValidators[f as keyof TValues]));

  const validationResults = fieldsToValidate
    .map(field =>
      runFieldValidationHandler(
        field as keyof TValues,
        values[field as keyof TValues],
        fieldValidators[field as keyof TValues]
      ));

  return Promise.all(validationResults);
};

export default runFieldLevelValidations;

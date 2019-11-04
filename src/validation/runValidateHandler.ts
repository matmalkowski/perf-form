import warning from 'tiny-warning';
import {
  ValidationHandler, ValidationResults, FieldValidationResults, FieldValidationHandler
} from '../types';
import { isPromise } from '../utils/utils';

type NonUndefined<T> = T extends undefined ? never : T;
type ValidationHandlerResults<TValues> = Promise<NonUndefined<ValidationResults<TValues>>>

const runValidationHandler = <TValues>(values: TValues, handler?: ValidationHandler<TValues>):
ValidationHandlerResults<TValues> => new Promise((resolve, reject) => {
  if (handler) {
    const maybePromiseErrors = handler(values);
    if (!maybePromiseErrors) {
      resolve({});
    } else if (isPromise(maybePromiseErrors)) {
      (maybePromiseErrors).then(
        errors => {
          resolve(errors || {});
        },
        exception => {
          warning(false, `An unhandled error was caught during validation: ${exception}`);

          reject(exception);
        }
      );
    } else {
      resolve(maybePromiseErrors);
    }
  } else {
    resolve({});
  }
});

type FieldValidationHandlerResults = Promise<NonUndefined<FieldValidationResults>>


const runFieldValidationHandler = (value: string, handler?: FieldValidationHandler):
FieldValidationHandlerResults => new Promise((resolve, reject) => {
  if (handler) {
    const maybePromiseErrors = handler(value);
    if (!maybePromiseErrors) {
      resolve(undefined);
    } else if (isPromise(maybePromiseErrors)) {
      (maybePromiseErrors).then(
        error => {
          resolve(error || undefined);
        },
        exception => {
          warning(false, `An unhandled error was caught during validation: ${exception}`);

          reject(exception);
        }
      );
    } else {
      resolve(maybePromiseErrors);
    }
  } else {
    resolve(undefined);
  }
});

export { runValidationHandler, runFieldValidationHandler };

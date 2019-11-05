import warning from 'tiny-warning';
import { FieldValidationHandler } from '../types';
import { isPromise } from '../utils/utils';
import { Errors } from '../store/types';

const runFieldValidationHandler = <TValues>(
  field: keyof TValues,
  value: TValues[keyof TValues],
  handler?: FieldValidationHandler): Promise<Errors<TValues>> =>
  new Promise((resolve, reject) => {
    if (handler) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const maybePromiseErrors = handler(value as any);
      if (!maybePromiseErrors) {
        resolve({});
      } else if (isPromise(maybePromiseErrors)) {
        maybePromiseErrors
          .then(errors => {
            if (errors) resolve({ [field]: errors } as Errors<TValues>);
            else resolve({});
          })
          .catch(exception => {
            warning(false, `An unhandled error was caught during validation: ${exception}`);

            reject(exception);
          });
      } else {
        resolve({ [field]: maybePromiseErrors } as Errors<TValues>);
      }
    } else {
      resolve({});
    }
  });

export default runFieldValidationHandler;

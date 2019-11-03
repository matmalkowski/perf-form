import warning from 'tiny-warning';
import { ValidateHandler, ValidationResults } from '../types';
import { isPromise } from '../utils/utils';

type NonUndefined<T> = T extends undefined ? never : T;
type ValidationHandlerResults<TValues> = Promise<NonUndefined<ValidationResults<TValues>>>
const runValidateHandler = <TValues>(values: TValues, handler?: ValidateHandler<TValues>):
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

export default runValidateHandler;

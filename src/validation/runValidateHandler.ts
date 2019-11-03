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
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              'Warning: An unhandled error was caught during execution of form level validate()',
              exception
            );
          }

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

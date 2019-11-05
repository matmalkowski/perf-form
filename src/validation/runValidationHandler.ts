import warning from 'tiny-warning';
import { ValidationHandler } from '../types';
import { isPromise } from '../utils/utils';
import { Errors } from '../store/types';

const runValidationHandler = <TValues>(
  values: TValues,
  handler?: ValidationHandler<TValues>
): Promise<Errors<TValues>> => new Promise((resolve, reject) => {
  if (handler) {
    const maybePromiseErrors = handler(values);
    if (!maybePromiseErrors) {
      resolve({});
    } else if (isPromise(maybePromiseErrors)) {
      maybePromiseErrors
        .then(errors => resolve(errors))
        .catch(exception => {
          warning(false, `An unhandled error was caught during validation: ${exception}`);

          reject(exception);
        });
    } else {
      resolve(maybePromiseErrors);
    }
  } else {
    resolve({});
  }
});


export default runValidationHandler;

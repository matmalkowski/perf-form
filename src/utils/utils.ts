/* eslint-disable @typescript-eslint/no-explicit-any */
export const isFunction = (obj: any): obj is Function =>
  typeof obj === 'function';

// eslint-disable-next-line @typescript-eslint/ban-types
export const isObject = (obj: any): obj is Object =>
  obj !== null && typeof obj === 'object';

export const isPromise = (value: any): value is PromiseLike<any> =>
  isObject(value) && isFunction(value.then);

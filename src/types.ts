import Observable from './utils/Observable';

export type Values = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type FormState<Values> = {
  values: Values;
};

export type FormContext<Values> = {
  getState: () => FormState<Values>;
  observable: Observable;
};

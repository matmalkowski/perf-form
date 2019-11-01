import Observable from './utils/Observable';

export type Values = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type FormState<TValues extends Values = Values> = {
  values: TValues;
};

export type FormStore<TValues extends Values = Values> = {
  getState: () => FormState<TValues>;
  dispatch: React.Dispatch<Action<TValues>>
}

export type FormContext<TValues extends Values = Values> = {
  store: FormStore<TValues>;
  observable: Observable;
};

export type Action<TValues extends Values = Values> = {
  type: 'FIELD_VALUE_CHANGE';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { field: keyof TValues; value?: any };
};

import Observable from './utils/Observable';
// eslint-disable-next-line import/no-cycle
import { Actions } from './store/types';

export type Values = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [field: string]: any;
};

export type Errors<Values> = {
  [P in keyof Values]?: string;
};

export type Touched<Values> = {
  [P in keyof Values]?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormState<TValues extends Values> = {
  values: TValues;
  touched: Touched<TValues>;
  errors: Errors<TValues>
  isValidating: boolean;
  validateOnBlur: boolean;
  validateOnChange: boolean;
  validateOnMount: boolean;
};

export type FormStore<TValues extends Values> = {
  getState: () => FormState<TValues>;
  dispatch: React.Dispatch<Actions<TValues>>
}

export type FormContext<TValues extends Values> = {
  store: FormStore<TValues>;
  observable: Observable;
};

/* eslint-disable import/no-cycle */
import { FieldValidationHandler, ValidationHandler } from '../types';
import { Actions } from './actions';

export type FieldValidators<TValues> = {
  [P in keyof TValues]?: FieldValidationHandler;
};

export type Decorator<TValues> = {
  validation: {
    validateForm?: ValidationHandler<TValues>;
  }
}

export type DispatchDecorator<TValues> = {
  validation: {
    validateField: FieldValidators<TValues>;
  }
} & Decorator<TValues>

export type Thunk<TValues, TReturn = void> = (
  dispatch: Dispatch<TValues>,
  getState: () => FormState<TValues>,
  decorator: DispatchDecorator<TValues>
) => Promise<TReturn>;

export type Dispatch<TValues, TReturn = void> = (action: Actions<TValues> | Thunk<TValues>) =>
Promise<TReturn>


export type Store<TValues> = {
  getState: () => FormState<TValues>
  dispatch: Dispatch<TValues>;
  subscribe: (listener: Function) => () => void;
  registerField: (name: keyof TValues, validate: FieldValidationHandler) => () => void;
}

export type Values = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [field: string]: any;
};

export type Errors<TValues extends Values> = {
  [P in keyof TValues]?: string;
};

export type Touched<TValues extends Values> = {
  [P in keyof TValues]?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormState<TValues extends Values> = {
  values: TValues;
  touched: Touched<TValues>;
  errors: Errors<TValues>;
  isSubmitting: boolean;
  isValidating: boolean;
  validateOnBlur: boolean;
  validateOnChange: boolean;
  validateOnMount: boolean;
};

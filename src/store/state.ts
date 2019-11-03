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

import Observable from './utils/Observable';


export type FieldValue = string | number | boolean;

export type Values = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [field: string]: any;
};


/**
 * An object containing error messages whose keys correspond to Fields.
 * Should be always be and object of strings, but any is allowed to support i18n libraries.
 * Same as in Formik
 */
export type Errors<Values> = {
  [P in keyof Values]?: string;
};

/**
 * An object containing touched state of the form whose keys correspond to Fields.
 */
export type Touched<Values> = {
  [P in keyof Values]?: boolean;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormState<TFields extends Values> = {
  values: TFields;
  touched: Touched<TFields>
  errors: Errors<TFields>
};

export type FormStore<TValues extends Values> = {
  getState: () => FormState<TValues>;
  dispatch: React.Dispatch<Action<TValues>>
}

export type FormContext<TValues extends Values> = {
  store: FormStore<TValues>;
  observable: Observable;
};

export type Action<TValues extends Values> = {
  type: 'FIELD_VALUE_CHANGE';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { field: keyof TValues; value?: any };
};

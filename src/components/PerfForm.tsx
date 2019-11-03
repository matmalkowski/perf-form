import React from 'react';

import reducer from '../store/reducer';
import { PerfFormContext } from '../Context';
import createStore from '../store/createStore';
import { Values, Errors } from '../store/state';

export type FormProps<TValues extends Values> = {
  initialValues: TValues;
  validate?: (values: TValues) => Errors<TValues> | undefined;
  validateOnBlur?: boolean
  validateOnChange?: boolean,
  validateOnMount?: boolean
};

type Props<T extends Values> = React.PropsWithChildren<FormProps<T>>;
const PerfForm = <TFormValues extends Values>(
  props: Props<TFormValues>
) => {
  const {
    children, initialValues, validate, validateOnBlur, validateOnChange, validateOnMount
  } = props;
  const store = React.useRef(createStore<TFormValues>(reducer,
    {
      values: initialValues,
      touched: {},
      errors: {},
      isValidating: false,
      isSubmitting: false,
      validateOnBlur: !!validateOnBlur,
      validateOnChange: !!validateOnChange,
      validateOnMount: !!validateOnMount
    },
    {
      validation: {
        validateForm: validate
      }
    }));

  console.warn('<Form /> rendered!');
  return (<PerfFormContext.Provider value={store.current}>{children}</PerfFormContext.Provider>);
};

PerfForm.defaultProps = {
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: false
};

export default PerfForm;

import React from 'react';

import reducer from '../store/reducer';
import { PerfFormContext } from '../Context';
import createStore from '../store/createStore';
import { ValidationHandler } from '../types';
import { Values } from '../store/types';

export type FormProps<TValues extends Values> = {
  initialValues: TValues;
  validate?: ValidationHandler<TValues>;
  validateOnBlur?: boolean
  validateOnChange?: boolean,
  validateOnMount?: boolean
  onSubmit: (values: TValues) => void;
};

type Props<T extends Values> = React.PropsWithChildren<FormProps<T>>;
const PerfForm = <TFormValues extends Values>(
  props: Props<TFormValues>
) => {
  const {
    children, initialValues, validate, onSubmit, validateOnBlur, validateOnChange, validateOnMount
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
      validateForm: validate,
      onSubmit
    }));

  return (<PerfFormContext.Provider value={store.current}>{children}</PerfFormContext.Provider>);
};

PerfForm.defaultProps = {
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: false
};

export default PerfForm;

import React from 'react';
import {
  Values, FormState, Errors
} from '../types';
import reducer from '../store/reducer';
import useThunkReducer from '../store/useThunkReducer';
import Provider from './Provider';
import { Actions, ThunkDecorator } from '../store/types';

export type FormProps<TValues extends Values> = {
  initialValues: TValues;
  validate?: (values: TValues) => Errors<TValues> | undefined;
  validateOnBlur?: boolean
  validateOnChange?: boolean,
  validateOnMount?: boolean
};

type Props<T extends Values> = React.PropsWithChildren<FormProps<T>>;
const Form = <TFormValues extends Values>(
  props: Props<TFormValues>
) => {
  const {
    children, initialValues, validate, validateOnBlur, validateOnChange, validateOnMount
  } = props;
  const [state, dispatch] = useThunkReducer<
  FormState<TFormValues>,
  Actions<TFormValues>,
  ThunkDecorator<TFormValues>
  >(reducer,
    {
      values: initialValues,
      touched: {},
      errors: {},
      isValidating: false,
      validateOnBlur: !!validateOnBlur,
      validateOnChange: !!validateOnChange,
      validateOnMount: !!validateOnMount
    },
    {
      validation: {
        validateForm: validate
      }
    });


  return (
    <Provider state={state} dispatch={dispatch}>
      <form>{children}</form>
    </Provider>
  );
};

Form.defaultProps = {
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: false
};

export default Form;

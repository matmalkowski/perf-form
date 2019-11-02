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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate?: (values: TValues) => Errors<TValues> | string | undefined;
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

  // const runValidation = React.useCallback(() => {
  //   if (validate) {
  //     const errors = validate(state.values);
  //     if (errors) {
  //       dispatch({ type: 'SET_ERRORS', payload: { errors } });
  //     }
  //   }
  // }, [state.values]);

  return (
    <Provider state={state} dispatch={dispatch}>
      <form>{children}</form>
    </Provider>
  );
};

export default Form;

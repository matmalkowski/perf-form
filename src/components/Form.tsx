import React from 'react';
import { Values, FormState, Action } from '../types';
import formReducer from './formReducer';
import Provider from './Provider';

export type FormProps<TValues extends Values> = {
  initialValues: TValues;
};

type Props<T> = React.PropsWithChildren<FormProps<T>>;
const Form = <TFormValues extends Values = Values>(
  props: Props<TFormValues>
) => {
  const { children, initialValues } = props;
  const [state, dispatch] = React.useReducer<
  React.Reducer<FormState<TFormValues>, Action<TFormValues>>
  >(formReducer, { values: initialValues });


  return (
    <Provider state={state} dispatch={dispatch}>
      <form>{children}</form>
    </Provider>
  );
};

export default Form;

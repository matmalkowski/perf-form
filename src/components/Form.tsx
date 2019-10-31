import React from 'react';
import { PerfFormContext, DispatchContext } from '../Context';
import { Values, FormState } from '../types';
import formReducer, { Action } from './formReducer';
import Observable from '../utils/Observable';

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

  const refObservable = React.useRef(new Observable());

  React.useEffect(() => {
    refObservable.current.notify();
  }, [state]);

  const ctx = React.useMemo(() => ({
    getState: () => state,
    observable: refObservable.current
  }), [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <PerfFormContext.Provider value={ctx}>
        <form>{children}</form>
      </PerfFormContext.Provider>
    </DispatchContext.Provider>
  );
};

export default Form;

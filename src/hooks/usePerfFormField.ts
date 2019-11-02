import React from 'react';
import usePerfFormHandlers from './usePerfFormHandlers';
import { usePerfFormSelector } from './usePerfFormSelector';
import { Values } from '../types';
import usePerfFormDispatch from './usePerformDispatch';
import { validateForm } from '../store/actions';

const usePerfFormField = <TValues extends Values>(name: keyof TValues) => {
  const dispatch = usePerfFormDispatch<TValues>();
  const isFirstEffect = React.useRef(true);
  const { handleOnChange, handleOnBlur } = usePerfFormHandlers();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = usePerfFormSelector<TValues, any>(
    state => state.values[name]
  );
  const touched = usePerfFormSelector<TValues, boolean>(
    state => !!state.touched[name]
  );

  const errors = usePerfFormSelector<TValues, string | undefined>(
    state => state.errors[name]
  );

  const shouldValidateOnMount = usePerfFormSelector<TValues, boolean>(
    state => state.validateOnMount
  );

  const shouldValidateOnChange = usePerfFormSelector<TValues, boolean>(
    state => state.validateOnChange
  );

  const shouldValidateOnBlur = usePerfFormSelector<TValues, boolean>(
    state => state.validateOnBlur
  );

  React.useEffect(() => {
    console.debug(`[${name}]:[${value}] isFirstEffect: ${isFirstEffect.current}`);
    if (shouldValidateOnMount) {
      dispatch(validateForm());
    }
    if (isFirstEffect.current === false && shouldValidateOnChange) {
      dispatch(validateForm());
    }
    if (isFirstEffect.current === false && shouldValidateOnBlur) {
      dispatch(validateForm());
    }
    isFirstEffect.current = false;
  }, [value, touched, shouldValidateOnMount, shouldValidateOnChange, shouldValidateOnBlur]);

  return {
    value,
    touched,
    errors,
    handleOnChange,
    handleOnBlur
  };
};

export default usePerfFormField;

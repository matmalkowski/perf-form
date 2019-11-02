import React from 'react';
import usePerfFormHandlers from './usePerfFormHandlers';
import { usePerfFormSelector } from './usePerfFormSelector';
import { Values } from '../types';
import usePerfFormDispatch from './usePerformDispatch';
import { validateForm } from '../store/actions';

const useField = <TValues extends Values>(name: keyof TValues) => {
  const dispatch = usePerfFormDispatch<TValues>();
  const isMounted = React.useRef(false);
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

  const isSubmitting = usePerfFormSelector<TValues, boolean>(
    state => state.isSubmitting
  );

  React.useEffect(() => {
    if (shouldValidateOnMount) {
      dispatch(validateForm());
    }
    if (isMounted.current) {
      if (shouldValidateOnBlur || shouldValidateOnChange) {
        dispatch(validateForm(name));
      }
    }


    isMounted.current = true;
  },
  [
    value,
    touched,
    shouldValidateOnMount,
    shouldValidateOnChange,
    shouldValidateOnBlur,
    isSubmitting
  ]);

  return {
    value,
    touched,
    errors,
    handleOnChange,
    handleOnBlur
  };
};

export default useField;

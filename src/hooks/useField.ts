import React from 'react';
import usePerfFormHandlers from './usePerfFormHandlers';
import { usePerfFormSelector } from './usePerfFormSelector';
import usePerfFormDispatch from './usePerformDispatch';
import { validateForm } from '../store/actions';
import { Values } from '../store/state';

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

  React.useEffect(() => {
    if (isMounted.current === false && shouldValidateOnMount) {
      dispatch(validateForm(name));
    }
    isMounted.current = true;
  },
  [
    shouldValidateOnMount
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

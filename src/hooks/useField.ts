import React from 'react';
import warning from 'tiny-warning';
import { usePerfFormSelector } from './usePerfFormSelector';
import { validateForm, executeChange, executeBlur } from '../store/actions';
import usePerfFormContext from './useFormContext';
import { Values } from '../store/types';
import { FieldValidationHandler } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getField = (event: React.ChangeEvent<any> | React.FocusEvent<any>, handlerName: string) => {
  if (event.persist) event.persist();
  const {
    name, id, value, outerHTML
  } = event.target;
  const field = name || id;
  warning(field, `PerfForm tried to handle \`${handlerName}\`, but you forgot to pass an \`id\` or \`name\` attribute to your input: 
    ${outerHTML}
    Cannot determine what value needs to be updated 😢`);
  return { field, value };
};

const useField = <TValues extends Values>(name: keyof TValues, validator?: FieldValidationHandler) => {
  const { dispatch, registerField } = usePerfFormContext<TValues>();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    const unregisterField = validator ? registerField(name, validator) : () => { };
    return () => unregisterField();
  }, []);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = React.useCallback((event: React.ChangeEvent<any>) => {
    const { field, value } = getField(event, 'onChange');
    if (field) {
      dispatch(executeChange<TValues>(field, value));
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnBlur = React.useCallback((event: React.FocusEvent<any>) => {
    const { field } = getField(event, 'onBlur');
    if (field) {
      dispatch(executeBlur<TValues>(field));
    }
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = usePerfFormSelector<TValues, any>(
    state => state.values[name]
  );

  return {
    value,
    handleOnChange,
    handleOnBlur
  };
};

export default useField;

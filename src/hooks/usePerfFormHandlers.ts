import React from 'react';
import usePerfFormDispatch from './usePerformDispatch';
import { setFieldValue, setFieldTouched } from '../store/actions';
import { Values } from '../store/state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getField = (event: React.ChangeEvent<any> | React.FocusEvent<any>) => {
  if (event.persist) event.persist();
  const { name, id, value } = event.target;
  const field = name || id;
  return { field, value };
};

const usePerfFormHandlers = <TValues extends Values>() => {
  const dispatch = usePerfFormDispatch<TValues>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = React.useCallback((event: React.ChangeEvent<any>) => {
    const { field, value } = getField(event);
    if (field) {
      dispatch(setFieldValue<TValues>(field, value));
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnBlur = React.useCallback((event: React.FocusEvent<any>) => {
    const { field } = getField(event);
    if (field) {
      dispatch(setFieldTouched<TValues>(field, true));
    }
  }, []);

  return {
    handleOnChange,
    handleOnBlur
  };
};

export default usePerfFormHandlers;

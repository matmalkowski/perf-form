import React from 'react';
import usePerfFormDispatch from './usePerformDispatch';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getField = (event: React.ChangeEvent<any> | React.FocusEvent<any>) => {
  if (event.persist) event.persist();
  const { name, id, value } = event.target;
  const field = name || id;
  return { field, value };
};

const usePerfFormHandlers = () => {
  const dispatch = usePerfFormDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = React.useCallback((event: React.ChangeEvent<any>) => {
    const { field, value } = getField(event);
    if (field) {
      dispatch({ type: 'FIELD_VALUE_CHANGE', payload: { field, value } });
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnBlur = React.useCallback((event: React.FocusEvent<any>) => {
    const { field, value } = getField(event);
    if (field) {
      dispatch({ type: 'FIELD_VALUE_CHANGE', payload: { field, value } });
    }
  }, []);

  return {
    handleOnChange,
    handleOnBlur
  };
};

export default usePerfFormHandlers;

import React from 'react';
import usePerfFormDispatch from './usePerformDispatch';

const usePerfFormHandlers = () => {
  const dispatch = usePerfFormDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = React.useCallback((event: React.ChangeEvent<any>) => {
    if (event.persist) event.persist();
    const { name, id, value } = event.target;
    const field = name || id;
    if (field) {
      dispatch({ type: 'FIELD_VALUE_CHANGE', payload: { field, value } });
    }
  }, []);

  return {
    handleChange
  };
};

export default usePerfFormHandlers;

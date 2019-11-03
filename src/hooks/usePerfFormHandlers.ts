import React from 'react';
import warning from 'tiny-warning';
import usePerfFormDispatch from './usePerformDispatch';
import { executeChange, executeBlur } from '../store/actions';
import { Values } from '../store/state';

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

const usePerfFormHandlers = <TValues extends Values>() => {
  const dispatch = usePerfFormDispatch<TValues>();

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

  return {
    handleOnChange,
    handleOnBlur
  };
};

export default usePerfFormHandlers;

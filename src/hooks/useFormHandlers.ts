import React from 'react';
import usePerfFormDispatch from './usePerformDispatch';
import { submitForm } from '../store/actions';
import { Values } from '../store/state';

const useFormHandlers = <TValues extends Values>() => {
  const dispatch = usePerfFormDispatch<TValues>();

  const handleSubmit = (event: React.FormEvent) => {
    if (event.persist) event.persist();
    event.preventDefault();
    dispatch(submitForm());
  };

  return {
    // isSubmitting,
    // isValidating,
    handleSubmit
  };
};

export default useFormHandlers;

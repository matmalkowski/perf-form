import React from 'react';
import { usePerfFormSelector } from './usePerfFormSelector';
import usePerfFormDispatch from './usePerformDispatch';
import { submitForm } from '../store/actions';
import { Values } from '../store/state';

const useForm = <TValues extends Values>() => {
  const dispatch = usePerfFormDispatch<TValues>();

  const isSubmitting = usePerfFormSelector<TValues, boolean>(
    state => state.isSubmitting
  );

  const isValidating = usePerfFormSelector<TValues, boolean>(
    state => state.isValidating
  );

  const handleSubmit = (event: React.FormEvent) => {
    if (event.persist) event.persist();
    event.preventDefault();
    dispatch(submitForm());
  };

  return {
    isSubmitting,
    isValidating,
    handleSubmit
  };
};

export default useForm;

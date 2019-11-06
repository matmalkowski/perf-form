import React from 'react';
import usePerfFormContext from './useFormContext';
import { Values } from '../store/types';
import { submitForm } from '../store/actions/submit';

const useFormHandlers = <TValues extends Values>() => {
  const { dispatch } = usePerfFormContext<TValues>();

  const handleSubmit = (event: React.FormEvent) => {
    if (event.persist) event.persist();
    event.preventDefault();
    dispatch(submitForm());
  };

  return {
    handleSubmit
  };
};

export default useFormHandlers;

import React from 'react';
import { submitForm } from '../store/actions';
import usePerfFormContext from './useFormContext';
import { Values } from '../store/types';

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

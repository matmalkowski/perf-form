import React from 'react';
import { PerfFormContext } from '../Context';
import { FormContext, Values } from '../types';

const usePerfFormContext = <TValues extends Values>(): FormContext<TValues> => {
  const context = React.useContext(PerfFormContext);

  return context;
};

export default usePerfFormContext;

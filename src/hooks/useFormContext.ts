import React from 'react';
import { PerfFormContext } from '../Context';
import { Store } from '../store/createStore';

const usePerfFormContext = <TValues>(): Store<TValues> => {
  const context = React.useContext(PerfFormContext);

  return context;
};

export default usePerfFormContext;

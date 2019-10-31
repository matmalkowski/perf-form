import React from 'react';
import { PerfFormContext } from '../Context';

const usePerfFormContext = () => {
  const context = React.useContext(PerfFormContext);

  return context;
};

export default usePerfFormContext;

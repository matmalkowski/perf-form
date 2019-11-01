import React from 'react';
import { Values, Action } from '../types';
import { PerfFormContext } from '../Context';

const usePerfFormDispatch = (): React.Dispatch<Action<Values>> => {
  const { store } = React.useContext(PerfFormContext);

  return store.dispatch;
};

export default usePerfFormDispatch;

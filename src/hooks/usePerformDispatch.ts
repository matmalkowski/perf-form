import React from 'react';
import { PerfFormContext } from '../Context';
import { Dispatch } from '../store/createStore';


const usePerfFormDispatch = <TValues>(): Dispatch<TValues> => {
  const { dispatch } = React.useContext(PerfFormContext);

  return dispatch;
};

export default usePerfFormDispatch;

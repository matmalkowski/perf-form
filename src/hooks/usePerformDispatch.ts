import React from 'react';
import { DispatchContext } from '../Context';
import { Action } from '../components/formReducer';
import { Values } from '../types';

const usePerfFormDispatch = (): React.Dispatch<Action<Values>> => {
  const context = React.useContext(DispatchContext);

  return context;
};

export default usePerfFormDispatch;

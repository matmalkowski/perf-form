import React from 'react';
import { FormState } from '../types';
import { PerfFormContext } from '../Context';
import { ThunkDispatch, Actions, ThunkDecorator } from '../store/types';


const usePerfFormDispatch = <TValues>(): ThunkDispatch<
FormState<TValues>,
Actions<TValues>,
ThunkDecorator<TValues>
> => {
  const { store } = React.useContext(PerfFormContext);

  return store.dispatch;
};

export default usePerfFormDispatch;

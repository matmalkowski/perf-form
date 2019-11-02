import React from 'react';
import { FormState } from '../types';
import { PerfFormContext } from '../Context';
import { ThunkDispatch, Actions, ThunkDecorator } from '../store/types';


const usePerfFormDispatch = <TValues>(): ThunkDispatch<
FormState<TValues>,
Actions<TValues>,
ThunkDecorator<TValues>
> => {
  const { dispatch } = React.useContext(PerfFormContext);

  return dispatch;
};

export default usePerfFormDispatch;

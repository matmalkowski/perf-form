import React from 'react';
import { FormState, Values, Action } from '../types';
import { PerfFormContext } from '../Context';
import Observable from '../utils/Observable';

const usePrevious = <T extends {}>(value: T) => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

type ProviderProps<TValues = Values> = {
  state: FormState<TValues>,
  dispatch: React.Dispatch<Action<TValues>>
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { state, dispatch, children } = props;
  const refObservable = React.useRef(new Observable());

  const getState = () => state;

  const contextValue = React.useMemo(() => ({
    store: {
      getState,
      dispatch
    },
    observable: refObservable.current
  }), [dispatch]);

  const previousState = usePrevious(getState());
  React.useEffect(() => {
    const { observable } = contextValue;
    if (previousState !== getState()) {
      // Not the cleanest way, but don't wanna change the memonized reference, so we don't trigger the Context refresh
      contextValue.store.getState = getState;
      observable.notify();
    }
  }, [contextValue, previousState]);

  return (<PerfFormContext.Provider value={contextValue}>{children}</PerfFormContext.Provider>);
};

export default Provider;

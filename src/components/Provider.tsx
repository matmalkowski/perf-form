import React from 'react';
import { FormState, Values } from '../types';
import { PerfFormContext } from '../Context';
import Observable from '../utils/Observable';
import { ThunkDispatch, Actions, ThunkDecorator } from '../store/types';


const usePrevious = <T extends {}>(value: T) => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

type ProviderProps<TValues extends Values> = {
  state: FormState<TValues>,
  dispatch: ThunkDispatch<FormState<TValues>, Actions<TValues>, ThunkDecorator<TValues>>
}

type Props<T extends Values> = React.PropsWithChildren<ProviderProps<T>>;

const Provider = <TFormValues extends Values>(props: Props<TFormValues>) => {
  const {
    state, dispatch, children
  } = props;
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
      console.log('new store ', getState());
      // Not the cleanest way, but don't wanna change the memonized reference, so we don't trigger the Context refresh
      contextValue.store.getState = getState;
      observable.notify();
    }
  }, [contextValue, previousState]);

  return (<PerfFormContext.Provider value={contextValue}>{children}</PerfFormContext.Provider>);
};

export default Provider;

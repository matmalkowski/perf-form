import React from 'react';
import { FormState, FormStore, Values } from '../types';
import usePerfFormContext from './usePerfFormContext';
import Observable from '../utils/Observable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refEquality = (a: any, b: any) => a === b;

const useSelectorWithStateAndObservable = <TValues extends Values, TSelected>(
  selector: (state: FormState<TValues>) => TSelected,
  store: FormStore<TValues>,
  observable: Observable
): TSelected => {
  const [, forceRender] = React.useReducer(s => s + 1, 0);
  const latestSelector = React.useRef<(s: FormState<TValues>) => TSelected
  >();
  const latestSelectedState = React.useRef<TSelected>();

  let selectedState: TSelected;

  if (selector !== latestSelector.current) {
    selectedState = selector(store.getState());
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    selectedState = latestSelectedState.current!;
  }

  React.useLayoutEffect(() => {
    latestSelector.current = selector;
    latestSelectedState.current = selectedState;
  });

  React.useLayoutEffect(() => {
    const checkUpdates = () => {
      const newSelectedState = latestSelector.current && latestSelector.current(store.getState());
      if (refEquality(newSelectedState, latestSelectedState.current)) {
        return;
      }

      latestSelectedState.current = newSelectedState;
      forceRender({});
    };
    observable.subscribe(checkUpdates);
    checkUpdates();
    return () => observable.unsubscribe(checkUpdates);
  }, [store, observable]);
  return selectedState;
};


const createSelectorHook = () => {
  const usePerfFormSelector = <TValues extends Values, TSelected>(
    selector: (state: FormState<TValues>) => TSelected
  ): TSelected => {
    const { store, observable } = usePerfFormContext<TValues>();
    return useSelectorWithStateAndObservable(selector, store, observable);
  };
  return usePerfFormSelector;
};

// eslint-disable-next-line import/prefer-default-export
export const usePerfFormSelector = createSelectorHook();

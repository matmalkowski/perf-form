import React from 'react';
import { FormState, Values } from '../types';
import usePerfFormContext from './useFormContext';
import { Actions } from '../store/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refEquality = (a: any, b: any) => a === b;

const useSelectorWithStateAndObservable = <TValues extends Values, TSelected>(
  selector: (state: FormState<TValues>) => TSelected,
  getState: () => FormState<TValues>,
  subscribe: (listener: Function) => () => void
): TSelected => {
  const [, forceRender] = React.useReducer(s => s + 1, 0);
  const latestSelector = React.useRef<(s: FormState<TValues>) => TSelected
  >();
  const latestSelectedState = React.useRef<TSelected>();

  let selectedState: TSelected;

  if (selector !== latestSelector.current) {
    selectedState = selector(getState());
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
      const state = getState();
      const newSelectedState = latestSelector.current && latestSelector.current(state);
      if (refEquality(newSelectedState, latestSelectedState.current)) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const selectorName = latestSelector!.current!.toString().replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');
      console.groupCollapsed(`State :: [${selectorName}]`);
      console.debug('prev-state:', latestSelectedState.current);
      console.debug('next-state:', newSelectedState);
      console.debug('global:', state);
      console.groupEnd();

      latestSelectedState.current = newSelectedState;

      forceRender({});
    };
    const unsubscribe = subscribe(checkUpdates);
    checkUpdates();
    return () => unsubscribe();
  }, [getState, subscribe]);
  return selectedState;
};


const createSelectorHook = () => {
  const usePerfFormSelector = <TValues extends Values, TSelected>(
    selector: (state: FormState<TValues>) => TSelected
  ): TSelected => {
    const { getState, subscribe } = usePerfFormContext<FormState<TValues>, Actions<TValues>>();
    return useSelectorWithStateAndObservable(selector, getState, subscribe);
  };
  return usePerfFormSelector;
};

// eslint-disable-next-line import/prefer-default-export
export const usePerfFormSelector = createSelectorHook();

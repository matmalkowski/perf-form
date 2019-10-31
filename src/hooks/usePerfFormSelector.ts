import React from 'react';
import { FormContext, FormState } from '../types';
import usePerfFormContext from './usePerfFormContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refEquality = (a: any, b: any) => a === b;

const useSelectorWithStateAndObservable = <TValues, TPartialState>(
  selector: (s: FormState<TValues>) => TPartialState,
  ctx: FormContext<TValues>
) => {
  console.debug(ctx);
  const [, forceRender] = React.useReducer(s => s + 1, 0);
  const latestSelector = React.useRef<(s: FormState<TValues>) => TPartialState
  >();
  const latestSelectedState = React.useRef<TPartialState>();

  let selectedState: TPartialState;

  if (selector !== latestSelector.current) {
    selectedState = selector(ctx.getState());
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
      const newSelectedState = latestSelector.current && latestSelector.current(ctx.getState());

      if (refEquality(newSelectedState, latestSelectedState.current)) {
        return;
      }

      latestSelectedState.current = newSelectedState;
      forceRender({});
    };
    ctx.observable.subscribe(checkUpdates);
    checkUpdates();
    return () => ctx.observable.unsubscribe(checkUpdates);
  }, [ctx]);
  return selectedState;
};

const createSelectorHook = () => {
  const usePerfFormSelector = <TValues, TPartialState>(
    selector: (s: FormState<TValues>) => TPartialState
  ) => {
    const context = usePerfFormContext();
    return useSelectorWithStateAndObservable(selector, context);
  };
  return usePerfFormSelector;
};

// eslint-disable-next-line import/prefer-default-export
export const usePerfFormSelector = createSelectorHook();

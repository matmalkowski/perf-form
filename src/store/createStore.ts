import React from 'react';
import { Actions } from './actions';
import { Errors, FormState } from './state';

export type ThunkDecorator<TValues> = {
  validation: {
    validateForm?: (values: TValues) => Errors<TValues> | undefined;
  }
}

export type Thunk<TValues> = (
  dispatch: Dispatch<TValues>,
  getState: () => FormState<TValues>,
  decorator: ThunkDecorator<TValues>
) => Promise<void>;

export type Dispatch<TValues> = (action: Actions<TValues> | Thunk<TValues>) =>
Promise<void>


export type Store<TValues> = {
  getState: () => FormState<TValues>
  dispatch: Dispatch<TValues>;
  subscribe: (listener: Function) => () => void;
}


const createStore = <TValues>(
  reducer: React.Reducer<FormState<TValues>, Actions<TValues>>,
  initialState: FormState<TValues>,
  decorator: ThunkDecorator<TValues>
): Store<TValues> => {
  let subscribers: Array<Function> = [];
  let state = reducer(initialState as FormState<TValues>, { type: '__INIT__' } as unknown as Actions<TValues>);

  const getState = () => state;
  const dispatch = (action: Actions<TValues> | Thunk<TValues>): Promise<void> =>
    new Promise((resolve) => {
      if (action instanceof Function) {
        action(dispatch, getState, decorator).finally(resolve);
      } else {
        state = reducer(state, action);
        resolve();
        subscribers.forEach(s => s(state));
      }
    });

  return {
    subscribe: (listener: Function) => {
      subscribers.push(listener);
      return () => {
        subscribers = subscribers.filter(s => s !== listener);
      };
    },
    getState,
    dispatch
  };
};

export default createStore;

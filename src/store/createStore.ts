import React from 'react';
import { Thunk } from './types';

export type Store<TState, TAction> = {
  getState: () => TState
  dispatch: (action: TAction) => void;
  subscribe: (listener: Function) => () => void;
}

const createStore = <TState, TAction, TDecorator>(
  reducer: React.Reducer<TState, TAction>,
  initialState: TState,
  decorator: TDecorator
): Store<TState, TAction> => {
  let subscribers: Array<Function> = [];
  let state = reducer(initialState as TState, { type: '__INIT__' } as unknown as TAction);

  const getState = () => state;
  const dispatch = (action: TAction | Thunk<TState, TAction, TDecorator>) => {
    if (action instanceof Function) {
      action(dispatch, getState, decorator);
    } else {
      state = reducer(state, action);
      subscribers.forEach(s => s(state));
    }
  };

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

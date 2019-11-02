/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Thunk, ThunkDispatch } from './types';

const thunkDispatch = <TState, TAction, TDecorator>(
  dispatch: React.Dispatch<TAction>,
  getState: () => TState,
  decorator: TDecorator
) =>
  (action: Thunk<TState, TAction, TDecorator> | TAction) =>
    (action instanceof Function ? action(dispatch, getState, decorator) : dispatch(action));

const useThunkReducer = <TState, TAction, TDecorator>(
  reducer: React.Reducer<TState, TAction>,
  initialState: TState,
  decorator: TDecorator
): [TState, ThunkDispatch<TState, TAction, TDecorator>] => {
  const [state, orgDispatch] = React.useReducer<React.Reducer<TState, TAction>>(reducer, initialState);

  const currentState = React.useRef(state);

  currentState.current = state;

  const dispatch = React.useMemo(() => {
    const getState = () => currentState.current;
    return thunkDispatch(orgDispatch, getState, decorator);
  }, []);


  return [state, dispatch];
};

export default useThunkReducer;

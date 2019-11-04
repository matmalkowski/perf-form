import React from 'react';
// eslint-disable-next-line import/no-cycle
import { Actions } from './actions';
import { FormState } from './state';
import { FieldValidationHandler, ValidationHandler } from '../types';
import debug from '../utils/debug';

type FieldValidators<TValues> = {
  [P in keyof TValues]?: FieldValidationHandler;
};

type Decorator<TValues> = {
  validation: {
    validateForm?: ValidationHandler<TValues>;
  }
}

type DispatchDecorator<TValues> = {
  validation: {
    validateField: FieldValidators<TValues>;
  }
} & Decorator<TValues>

export type Thunk<TValues, TReturn = void> = (
  dispatch: Dispatch<TValues>,
  getState: () => FormState<TValues>,
  decorator: DispatchDecorator<TValues>
) => Promise<TReturn>;

export type Dispatch<TValues, TReturn = void> = (action: Actions<TValues> | Thunk<TValues>) =>
Promise<TReturn>


export type Store<TValues> = {
  getState: () => FormState<TValues>
  dispatch: Dispatch<TValues>;
  subscribe: (listener: Function) => () => void;
  registerField: (name: keyof TValues, validate: FieldValidationHandler) => () => void;
}


const createStore = <TValues>(
  reducer: React.Reducer<FormState<TValues>, Actions<TValues>>,
  initialState: FormState<TValues>,
  decorator: Decorator<TValues>
): Store<TValues> => {
  let subscribers: Array<Function> = [];
  const fieldsValidators: FieldValidators<TValues> = {};
  let state = reducer(initialState as FormState<TValues>, { type: '__INIT__' } as unknown as Actions<TValues>);

  const getState = () => state;
  const dispatch = (action: Actions<TValues> | Thunk<TValues>): Promise<void> => {
    if (action instanceof Function) {
      return action(
        dispatch,
        getState,
        {
          ...decorator,
          validation: {
            ...decorator.validation,
            validateField: fieldsValidators
          }
        }
      );
    }
    if (__DEV__) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      debug('Action', action.type, (action as any).payload);
    }
    state = reducer(state, action);
    subscribers.forEach(s => s(state));
    return Promise.resolve();
  };

  return {
    subscribe: (listener: Function) => {
      subscribers.push(listener);
      return () => {
        subscribers = subscribers.filter(s => s !== listener);
      };
    },
    registerField: (name: keyof TValues, validate: FieldValidationHandler) => {
      fieldsValidators[name] = validate;
      return () => {
        delete fieldsValidators[name];
      };
    },
    getState,
    dispatch
  };
};

export default createStore;

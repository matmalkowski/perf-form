/* eslint-disable import/no-cycle */
import {
  SetFieldValueAction, SetFieldTouchedAction, SetErrorsAction, SetIsValidatingAction
} from './actions';

import { FormState, Errors } from '../types';


export type Thunk<TState, TAction, TDecorator> = (
  dispatch: React.Dispatch<TAction>,
  getState: () => TState,
  decorator: TDecorator
) => void;

export type ThunkDispatch<TState, TAction, TDecorator> = React.Dispatch<Thunk<TState, TAction, TDecorator> | TAction>;
export type ThunkAction<TValues, TDecorator> = Thunk<FormState<TValues>, Actions<TValues>, TDecorator>

export type ThunkDecorator<TValues> = {
  validation: {
    validateForm?: (values: TValues) => Errors<TValues> | string | undefined;
  }
}

export type Actions<TValues> =
  SetFieldValueAction<TValues> |
  SetFieldTouchedAction<TValues> |
  SetErrorsAction<TValues> |
  SetIsValidatingAction

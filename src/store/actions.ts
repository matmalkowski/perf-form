import {
  SetFieldValueAction, SetFieldTouchedAction, SetFieldErrorAction, SetErrorsAction
} from './actions/field/types';
import { SetIsValidatingAction } from './actions/validation/types';
import { SubmitAttemptAction, SubmitFinishAction } from './actions/submit/types';

export type Actions<TValues> =
  SetFieldValueAction<TValues> |
  SetFieldTouchedAction<TValues> |
  SetFieldErrorAction<TValues> |
  SetErrorsAction<TValues> |
  SetIsValidatingAction |
  SubmitAttemptAction |
  SubmitFinishAction

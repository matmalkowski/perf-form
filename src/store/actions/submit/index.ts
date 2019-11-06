import {
  SubmitAttemptAction, SUBMIT_ATTEMPT, SubmitFinishAction, SUBMIT_FINISH
} from './types';
import { Thunk } from '../../types';
import { executeValidateForm } from '../validation';

export const submitAttempt = ():
SubmitAttemptAction =>
  ({ type: SUBMIT_ATTEMPT });


export const submitFinish = ():
SubmitFinishAction =>
  ({ type: SUBMIT_FINISH });


export const executeSubmit = <TValues>(): Thunk<TValues> =>
  (_, getState, { onSubmit }) => {
    const { values, errors } = getState();
    if (Object.keys(errors).length === 0) {
      onSubmit(values);
    }
    return Promise.resolve();
  };

export const submitForm = <TValues>(): Thunk<TValues> =>
  (dispatch, _) =>
    dispatch(submitAttempt())
      .then(() => dispatch(executeValidateForm()))
      .then(() => dispatch(executeSubmit()))
      .catch(e => { throw e; })
      .finally(() => dispatch(submitFinish()));

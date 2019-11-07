import {
  SubmitAttemptAction, SUBMIT_ATTEMPT, SubmitFinishAction, SUBMIT_FINISH
} from './types';
import { Thunk } from '../../types';
import { executeValidateForm } from '../validation';
import executeSubmit from './executeSubmit';

export const submitAttempt = ():
SubmitAttemptAction =>
  ({ type: SUBMIT_ATTEMPT });


export const submitFinish = ():
SubmitFinishAction =>
  ({ type: SUBMIT_FINISH });


export const submitForm = <TValues>(): Thunk<TValues> =>
  async (dispatch, _) => {
    await dispatch(submitAttempt());
    await dispatch(executeValidateForm());
    await dispatch(executeSubmit());
    return dispatch(submitFinish());
  };

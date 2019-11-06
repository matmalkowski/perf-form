import { Action } from '../../types';

export const SUBMIT_ATTEMPT = 'SUBMIT_ATTEMPT';
export type SubmitAttemptAction = Action<typeof SUBMIT_ATTEMPT>

export const SUBMIT_FINISH = 'SUBMIT_FINISH';
export type SubmitFinishAction = Action<typeof SUBMIT_FINISH>

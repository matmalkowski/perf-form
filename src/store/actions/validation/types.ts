import { Action } from '../../types';

const SET_IS_VALIDATING = 'SET_IS_VALIDATING';
export interface SetIsValidatingAction extends Action<typeof SET_IS_VALIDATING> {
  payload: { isValidating: boolean };
}

export default SET_IS_VALIDATING;

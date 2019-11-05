import {
  SET_FIELD_VALUE,
  SET_FIELD_TOUCHED,
  SET_ERRORS,
  SET_FIELD_ERROR,
  SET_IS_VALIDATING,
  SUBMIT_ATTEMPT,
  SUBMIT_FINISH,
  Actions
} from './actions';
import { Values, FormState } from './types';

const reducer = <TValues extends Values>(
  state: FormState<TValues>,
  action: Actions<TValues>
): FormState<TValues> => {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: action.payload.value
        }
      };
    case SET_FIELD_TOUCHED:
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.field]: action.payload.touched
        }
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload.errors
      };
    case SET_FIELD_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error
        }
      };
    case SET_IS_VALIDATING:
      return {
        ...state,
        isValidating: action.payload.isValidating
      };
    case SUBMIT_ATTEMPT:
      return {
        ...state,
        touched: { ...Object.keys(state.values).reduce((acc, key) => ({ ...acc, [key]: true }), {}) },
        isSubmitting: true
      };
    case SUBMIT_FINISH:
      return {
        ...state,
        isSubmitting: false
      };
    default:
      return state;
  }
};

export default reducer;

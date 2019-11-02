import { FormState, Values } from '../types';
import { Actions } from './types';
import {
  SET_FIELD_VALUE, SET_FIELD_TOUCHED, SET_ERRORS, SET_FIELD_ERROR, SET_IS_VALIDATING
} from './actions';

const reducer = <TValues extends Values>(
  state: FormState<TValues>,
  action: Actions<TValues>
): FormState<TValues> => {
  console.log(`Action :: [${action.type}]`, action.payload);
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
    default:
      return state;
  }
};

export default reducer;

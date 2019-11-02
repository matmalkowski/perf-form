import { FormState, Values } from '../types';
import { Actions } from './types';

const reducer = <TValues extends Values>(
  state: FormState<TValues>,
  action: Actions<TValues>
): FormState<TValues> => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: action.payload.value
        }
      };
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.field]: action.payload.touched
        }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default reducer;

import { FormState, Action, Values } from '../types';

const formReducer = <TValues extends Values>(
  state: FormState<TValues>,
  action: Action<TValues>
): FormState<TValues> => {
  switch (action.type) {
    case 'FIELD_VALUE_CHANGE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: action.payload.value
        }
      };
    default:
      return state;
  }
};

export default formReducer;

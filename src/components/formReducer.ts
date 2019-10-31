import { FormState } from '../types';

export type Action<TValues> = {
  type: 'FIELD_VALUE_CHANGE';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { field: keyof TValues; value?: any };
};

const formReducer = <TValues>(
  state: FormState<TValues>,
  action: Action<TValues>
): FormState<TValues> => {
  console.debug(action);
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

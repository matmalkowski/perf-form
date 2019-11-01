import usePerfFormHandlers from './usePerfFormHandlers';
import { usePerfFormSelector } from './usePerfFormSelector';
import { Values, FieldValue } from '../types';

const usePerfFormField = <TValues extends Values>(name: keyof TValues) => {
  const { handleOnChange, handleOnBlur } = usePerfFormHandlers();
  const value = usePerfFormSelector<TValues, FieldValue>(
    state => state.values[name]
  );
  const touched = usePerfFormSelector<TValues, boolean>(
    state => !!state.touched[name]
  );

  const errors = usePerfFormSelector<TValues, string | undefined>(
    state => state.errors[name]
  );

  return {
    value,
    touched,
    errors,
    handleOnChange,
    handleOnBlur
  };
};

export default usePerfFormField;

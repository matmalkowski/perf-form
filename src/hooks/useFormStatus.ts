import { usePerfFormSelector } from './usePerfFormSelector';
import { Values } from '../store/types';

const useFormStatus = <TValues extends Values>() => {
  const isSubmitting = usePerfFormSelector<TValues, boolean>(
    state => state.isSubmitting
  );

  const isValidating = usePerfFormSelector<TValues, boolean>(
    state => state.isValidating
  );

  const isValid = usePerfFormSelector<TValues, boolean>(
    state => Object.keys(state.errors).length === 0
  );

  return {
    isSubmitting,
    isValidating,
    isValid
  };
};

export default useFormStatus;

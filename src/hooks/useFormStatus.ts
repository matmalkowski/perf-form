import { usePerfFormSelector } from './usePerfFormSelector';
import { Values } from '../store/state';

const useFormStatus = <TValues extends Values>() => {
  const isSubmitting = usePerfFormSelector<TValues, boolean>(
    state => state.isSubmitting
  );

  const isValidating = usePerfFormSelector<TValues, boolean>(
    state => state.isValidating
  );

  return {
    isSubmitting,
    isValidating

  };
};

export default useFormStatus;

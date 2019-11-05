import { usePerfFormSelector } from './usePerfFormSelector';
import { Values } from '../store/types';

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

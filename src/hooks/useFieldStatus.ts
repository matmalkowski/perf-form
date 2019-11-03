import { usePerfFormSelector } from './usePerfFormSelector';

import { Values } from '../store/state';

const useFieldStatus = <TValues extends Values>(name: keyof TValues) => {
  const touched = usePerfFormSelector<TValues, boolean>(
    state => !!state.touched[name]
  );

  const errors = usePerfFormSelector<TValues, string | undefined>(
    state => state.errors[name]
  );

  return {
    touched,
    errors
  };
};

export default useFieldStatus;

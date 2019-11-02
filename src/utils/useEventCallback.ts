import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEventCallback = (fn: Function, deps: any[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  React.useEffect(() => {
    ref.current = fn;
  }, [fn, ...deps]);

  return React.useCallback(() => {
    const fns = ref.current;
    return fns();
  }, [ref]);
};

export default useEventCallback;

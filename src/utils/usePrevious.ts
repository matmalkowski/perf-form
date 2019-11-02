import React from 'react';

const usePrevious = <T extends {}>(value: T) => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;

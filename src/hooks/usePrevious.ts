// Create a hook usePrevious() to return the previous value, with initial previous value of undefined.

import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const previous = useRef<T>();

  useEffect(() => {
    previous.current = value;
  });

  return previous.current;
}

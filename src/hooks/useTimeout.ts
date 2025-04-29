// Create a hook to easily use setTimeout(callback, delay).

// 1.reset the timer if delay changes
// 2.DO NOT reset the timer if only callback changes

import { useEffect, useRef } from 'react';

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const timer = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);
}

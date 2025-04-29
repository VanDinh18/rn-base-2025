/* eslint-disable react-hooks/exhaustive-deps */
// Implement useUpdateEffect() that it works the same as useEffect() except that it skips running the callback on first render.

import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, deps);
}

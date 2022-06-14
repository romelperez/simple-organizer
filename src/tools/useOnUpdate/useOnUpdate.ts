import { useRef, useEffect } from 'react';

// TODO: Create a better alternative.
const useOnUpdate = (callback: () => void, dependencies: unknown[] = []): void => {
  const isFirstRef = useRef(true);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }

    callback();
  }, dependencies);
};

export { useOnUpdate };

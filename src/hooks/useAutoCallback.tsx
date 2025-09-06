import { useCallback, useRef } from "react";

export const useAutoCallback = <T extends (...args: any[]) => void>(
  callback: T
) => {
  const ref = useRef(callback);

  ref.current = callback;

  return useCallback((...args: Parameters<T>) => {
    ref.current(...args);
  }, []);
};

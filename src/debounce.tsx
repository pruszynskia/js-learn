import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
}

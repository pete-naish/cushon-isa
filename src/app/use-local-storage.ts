import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    //@ts-ignore
    const item = window.localStorage.getItem(key);
    if (item !== undefined && item !== null) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
    return initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    // Allow value to be a function so we have the same API as useState
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    // Save state
    setStoredValue(valueToStore);
    // Save to local storage
    //@ts-ignore
    window.localStorage.setItem(
      key,
      typeof valueToStore === "string"
        ? valueToStore
        : JSON.stringify(valueToStore)
    );
  };

  return [storedValue, setValue];
}

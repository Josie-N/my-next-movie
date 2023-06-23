import { useEffect, useState } from "react";

export function useLocalStorage (defaultValue: boolean, key: string) {

  const [value, setValue] = useState(() => {
    const persistentValue = window.localStorage.getItem(key);

    return persistentValue !== null
      ? JSON.parse(persistentValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

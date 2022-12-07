import { useEffect, useState } from "react";

export default function useLocalStorage (defaultValue, key) {

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

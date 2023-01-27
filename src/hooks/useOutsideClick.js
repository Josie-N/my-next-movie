// @ts-ignore
import { useEffect, useRef } from "react";

export default function useOutsideClick (callback) {
  const ref = useRef(null);

  // console.log(ref, 'ref 1')
  // console.log('How many times does this run?');

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);

  // console.log(ref, 'ref 2')

  return ref;
};

import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";

const DelayedFallback = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300);

    return () => {
      clearTimeout(timeout);
    }
  }, [])

  return (
    <>
      {show && <Spinner />}
    </>
  )
}
export default DelayedFallback;
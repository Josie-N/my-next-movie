import React, { useEffect, useState } from "react";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

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
      {show && <LoadingIndicator />}
    </>
  )
}
export default DelayedFallback;

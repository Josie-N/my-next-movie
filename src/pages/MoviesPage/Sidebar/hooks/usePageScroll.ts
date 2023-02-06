// noinspection JSDeprecatedSymbols

import { useLayoutEffect, useState } from "react";

export default function usePageScroll(): boolean {
  const [isPageScrolledDown, setPageScrolledDown] = useState(window.pageYOffset > 100);

  // Adds event handler to catch the scroll position of the whole page (window)
  useLayoutEffect(() => {
    const handleScroll = () => setPageScrolledDown(window.pageYOffset > 100);

    // Setting the event handler when the component is mounted
    window.addEventListener("scroll", handleScroll);
    // Cleanup function for removing the event handler when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isPageScrolledDown;
}

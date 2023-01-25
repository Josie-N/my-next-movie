import classNames from "classnames/bind";
import styles from "../WatchlistSidebar.module.css";

export const getWatchlistStyles = (isPageScrolledDown: boolean): string => {
  const cn = classNames.bind(styles);

  const watchlistContainerClassNames = cn(
    'watchlistContainer',
    { 'watchlistContainer__scrollDown': isPageScrolledDown }
  )

  return watchlistContainerClassNames;
}

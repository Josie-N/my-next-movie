import React from "react";
import styles from "../WatchlistSidebar/WatchlistSidebar.module.css";
import { ADDED, REMOVED } from "../../constants/constants";
import { useStore } from "../../store/store";

export const WatchlistSidebar = () => {
  const updateMovieListType = useStore(state => state.changeMovieListType);
  const countAddedList = useStore(state => state.howManyMoviesAddedList);
  const countRemovedList = useStore(state => state.howManyMoviesRemovedList);

  return (
    <aside className={styles.watchlistContainer}>
      <h2 className={styles.watchlistTitle}>My watchlist:</h2>
      <ul className={styles.watchlist}>
        <li>
          <div className={styles.watchlistLink} onClick={() => updateMovieListType(ADDED)}>
            <span className={styles.emoji}>👍🏻</span>
            <h3 className={styles.watchlistItemLabel}>
              Added ({countAddedList})
            </h3>
          </div>
        </li>
        <li>
          <a href="/">
            <span className={styles.emoji}>👀</span>
            <h3 className={styles.watchlistItemLabel}>
              Already seen (0)
            </h3>
          </a>
        </li>
        <li>
          <div className={styles.watchlistLink} onClick={() => updateMovieListType(REMOVED)}>
            <span className={styles.emoji}>👎</span>
            <h3 className={styles.watchlistItemLabel}>
              Removed ({countRemovedList})
            </h3>
          </div>
        </li>
      </ul>
    </aside>
  );
}

import React from "react";
import { Link } from "react-router-dom";

import { useMovieListType } from "../../store/store";
import { ADDED, REMOVED } from "../../constants/constants";

import styles from "../WatchlistSidebar/WatchlistSidebar.module.css";

export const WatchlistSidebar = ({ watchlistAdd, watchlistRemove }) => {
  const updateMovieListType = useMovieListType(state => state.changeMovieListType);

  return (
    <aside className={styles.watchlistContainer}>
      <h2 className={styles.watchlistTitle}>My watchlist:</h2>
      <ul className={styles.watchlist}>
        <li>
          <Link to="/added">
            <div className={styles.watchlistLink} onClick={() => updateMovieListType(ADDED)}>
              <span className={styles.emoji}>👍🏻</span>
              <h3 className={styles.watchlistItemLabel}>
                Added ({watchlistAdd})
              </h3>
            </div>
          </Link>
        </li>
        <li>
          <a href="/">
            <span className={styles.emoji}>👀</span>
            <h3 className={styles.watchlistItemLabel}>Already seen (0)</h3>
          </a>
        </li>
        <li>
          <div className={styles.watchlistLink} onClick={() => updateMovieListType(REMOVED)}>
            <span className={styles.emoji}>👎</span>
            <h3 className={styles.watchlistItemLabel}>Removed ({watchlistRemove})</h3>
          </div>
        </li>
      </ul>
    </aside>
  );
}










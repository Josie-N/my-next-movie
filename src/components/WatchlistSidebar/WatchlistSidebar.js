import React from "react";
import styles from "../../components/WatchlistSidebar/WatchlistSidebar.module.css";
import { Link } from "react-router-dom";
import { ADDED, REMOVED } from "../../constants/constants";


export const WatchlistSidebar = ({ setMovieListType, watchlistAdd, watchlistRemove }) => {
  return (
    <aside className={styles.watchlistContainer}>
      <h2 className={styles.watchlistTitle}>My watchlist:</h2>
      <ul className={styles.watchlist}>
        <li>
          <div className={styles.watchlistLink} onClick={() => setMovieListType('added')}>
            <div className={styles.watchlistLink} onClick={() => setMovieListType(ADDED)}>
              <span className={styles.emoji}>👍🏻</span>
              <h3 className={styles.watchlistItemLabel}>
                Added ({watchlistAdd})
              </h3>
            </div>
        </li>
        <li>
          <a href="/">
            <span className={styles.emoji}>👀</span>
            <h3 className={styles.watchlistItemLabel}>Already seen (0)</h3>
          </a>
        </li>
        <li>
          <div className={styles.watchlistLink} onClick={() => setMovieListType(REMOVED)}>
            <span className={styles.emoji}>👎</span>
            <h3 className={styles.watchlistItemLabel}>Removed ({watchlistRemove})</h3>
          </div>
        </li>
      </ul>
    </aside>
  );
}










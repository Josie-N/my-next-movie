import React from "react";
import styles from "../../components/WatchlistSidebar/WatchlistSidebar.module.css";


export const WatchlistSidebar = ({ setMovieListType, watchlistAdd, watchlistRemove }) => {
  return (
    <aside className={styles.watchlistContainer}>
      <h2 className={styles.watchlistTitle}>My watchlist:</h2>
      <ul className={styles.watchlist}>
        <li>
          <div className={styles.watchlistLink} onClick={() => setMovieListType('added')}>
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
          <div className={styles.watchlistLink} onClick={() => setMovieListType('removed')}>
            <span className={styles.emoji}>👎</span>
            <h3 className={styles.watchlistItemLabel}>Removed ({watchlistRemove})</h3>
          </div>
        </li>
      </ul>
    </aside>
  );
}










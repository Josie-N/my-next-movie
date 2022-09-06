import React from "react";
import styles from "../../components/WatchlistSidebar/WatchlistSidebar.module.css";


export const WatchlistSidebar = () => {
  return (
    <aside className={styles.watchlistContainer}>
      <h2 className={styles.watchlistTitle}>My watchlist:</h2>
      <ul className={styles.watchlist}>
        <li>
          <a href="/">
            <span className={styles.emoji}>👍 </span>
            <h3 className={styles.watchlistItemLabel}>Added (32)</h3>
          </a>
        </li>
        <li>
          <a href="/">
            <span className={styles.emoji}>👀 </span>
            <h3 className={styles.watchlistItemLabel}>Already seen (5)</h3>
          </a>
        </li>
        <li>
          <a href="/">
            <span className={styles.emoji}>👎 </span>
            <h3 className={styles.watchlistItemLabel}>Removed (2)</h3>
          </a>
        </li>
      </ul>
    </aside>
  );
}










import React from "react";
import styles from "../WatchlistSidebar/WatchlistSidebar.module.css";
import { Emoji, MovieListType } from "../../constants/constants";

import { useStore } from "../../store/store";

export const WatchlistSidebar = () => {
  const updateMovieListType = useStore(state => state.changeMovieListType);
  const movieCountAddedList = useStore(state => state.movieCountAddedList);
  const movieCountRemovedList = useStore(state => state.movieCountRemovedList);

  return (
    <aside className={styles.watchlistContainer}>
      <h2 className={styles.watchlistTitle}>My watchlist:</h2>
      <ul className={styles.watchlist}>
        <li>
          <div className={styles.watchlistLink} onClick={() => updateMovieListType(MovieListType.Added)}>
            <span className={styles.emoji}>{Emoji.ThumbsUp}</span>
            <h3 className={styles.watchlistItemLabel}>
              Added ({movieCountAddedList})
            </h3>
          </div>
        </li>
        <li>
          <a href="/">
            <span className={styles.emoji}>{Emoji.Eyes}</span>
            <h3 className={styles.watchlistItemLabel}>
              Already seen (0)
            </h3>
          </a>
        </li>
        <li>
          <div className={styles.watchlistLink} onClick={() => updateMovieListType(MovieListType.Removed)}>
            <span className={styles.emoji}>{Emoji.ThumbsDown}</span>
            <h3 className={styles.watchlistItemLabel}>
              Removed ({movieCountRemovedList})
            </h3>
          </div>
        </li>
      </ul>
    </aside>
  );
}

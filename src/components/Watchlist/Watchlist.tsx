import React from "react";
import classNames from "classnames/bind";

import styles from "./Watchlist.module.css";
import { Emoji, MovieListType } from "../../constants/constants";
import { useStore } from "../../store/store";
import useWatchlistName from "../../hooks/useWatchlistName";
import useQueryUsername from "../../hooks/useQueryUsername";

export default function Watchlist() {
  const cn = classNames.bind(styles);

  const updateMovieListType = useStore(state => state.changeMovieListType);

  const { watchlistNameAdded, watchlistNameRemoved } = useWatchlistName();
  const usernameData = useQueryUsername();

  const movieCountAddedList = usernameData?.lists?.added?.total || 0;
  const movieCountRemovedList = usernameData?.lists?.removed?.total || 0;

  return (
    <>
      <h2 className={styles.watchlistTitle}>My watchlist:</h2>
      <ul className={styles.watchlist}>
        <li>
          <div className={cn('watchlistLink', { 'watchlistLink__selected': watchlistNameAdded })}
               onClick={() => updateMovieListType(MovieListType.Added)}
          >
            <span className={styles.emoji}>{Emoji.ThumbsUp}</span>
            <h3 className={cn('watchlistItemLabel', { 'watchlistItemLabel__selected': watchlistNameAdded })}>
              Added ({movieCountAddedList})
            </h3>
          </div>
        </li>
        <li>
          <a className={styles.watchlistLink} href="/">
            <span className={styles.emoji}>{Emoji.Eyes}</span>
            <h3 className={styles.watchlistItemLabel}>
              Already seen (0)
            </h3>
          </a>
        </li>
        <li>
          <div className={cn('watchlistLink', { 'watchlistLink__selected': watchlistNameRemoved })}
               onClick={() => updateMovieListType(MovieListType.Removed)}
          >
            <span className={styles.emoji}>{Emoji.ThumbsDown}</span>
            <h3 className={cn('watchlistItemLabel', { 'watchlistItemLabel__selected': watchlistNameRemoved })}>
              Removed ({movieCountRemovedList})
            </h3>
          </div>
        </li>
      </ul>
    </>
  );
}

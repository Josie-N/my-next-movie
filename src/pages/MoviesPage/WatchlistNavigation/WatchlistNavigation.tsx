import React from "react";
import classNames from "classnames/bind";

import styles from "./WatchlistNavigation.module.css";

import { useStore } from "../../../store/store";
import { Emoji, MovieListType } from "../../../constants/constants";

import useWatchlistName from "../../../hooks/useWatchlistName";
import useQueryUsername from "../../../hooks/useQueryUsername";
import { Heading } from "src/components/generic/Heading/Heading";

export default function WatchlistNavigation() {
  const cn = classNames.bind(styles);

  const updateMovieListType = useStore(state => state.changeMovieListType);

  const { watchlistNameAdded, watchlistNameRemoved } = useWatchlistName();
  const usernameData = useQueryUsername();

  const movieCountAddedList = usernameData?.lists?.added?.total || 0;
  const movieCountRemovedList = usernameData?.lists?.removed?.total || 0;

  return (
    <>
      <nav>
        <h2 className={styles.watchlistTitle} id="myWatchlist">My watchlist:</h2>
        <ul role="listbox" aria-labelledby="myWatchlist" className={styles.watchlist}>
          <li className={cn('watchlistLink', { 'watchlistLink__selected': watchlistNameAdded })}
              onClick={() => updateMovieListType(MovieListType.Added)}
              role="option" aria-selected={watchlistNameAdded} tabIndex={0}
          >
            <span className={styles.emoji} aria-hidden>{Emoji.ThumbsUp}</span>
            <h3 className={cn('watchlistItemLabel', { 'watchlistItemLabel__selected': watchlistNameAdded })}>
              Added ({movieCountAddedList})
            </h3>
          </li>
          <li role="option" aria-selected={false}>
            <a className={styles.watchlistLink} href="/" tabIndex={0}>
              <span className={styles.emoji} aria-hidden>{Emoji.Eyes}</span>
              <h3 className={styles.watchlistItemLabel}>
                Already seen (0)
              </h3>
            </a>
          </li>
          <li className={cn('watchlistLink', { 'watchlistLink__selected': watchlistNameRemoved })}
              onClick={() => updateMovieListType(MovieListType.Removed)}
              role="option" aria-selected={watchlistNameRemoved} tabIndex={0}
          >
            <span className={styles.emoji} aria-hidden>{Emoji.ThumbsDown}</span>
            <Heading level="h3" hideTextVisually>{movieCountRemovedList} removed movies</Heading>
            <Heading level="h3" hideFromScreenReader
                     styling={cn('watchlistItemLabel', { 'watchlistItemLabel__selected': watchlistNameRemoved })}>
              Removed ({movieCountRemovedList})
            </Heading>
          </li>
        </ul>
      </nav>
    </>
  );
}

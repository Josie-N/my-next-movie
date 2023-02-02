import React from 'react';
import helperStyles from "../../../assets/stylesheets/helper.module.css";
import useWatchlistName from "../../../hooks/useWatchlistName";

export default function SelectedWatchlistHeadingA11y() {
  const { watchlistNameRecommended, watchlistNameAdded, watchlistNameRemoved } = useWatchlistName();

  return (
    <h2 className={helperStyles.visuallyHidden}>
      {watchlistNameRecommended && 'Browse all movies available'}
      {watchlistNameAdded && 'Your added watchlist'}
      {watchlistNameRemoved && 'Your removed watchlist'}
    </h2>
  );
}

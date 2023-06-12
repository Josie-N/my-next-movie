import React from 'react';
import useWatchlistName from "../../../hooks/useWatchlistName";
import { Heading } from 'src/components/generic/Heading/Heading';

export default function SelectedWatchlistHeadingA11y() {
  const { watchlistNameRecommended, watchlistNameAdded, watchlistNameRemoved } = useWatchlistName();

  return (
    <Heading level="h2" hideTextVisually>
      {watchlistNameRecommended && 'Browse all movies available'}
      {watchlistNameAdded && 'My added watchlist'}
      {watchlistNameRemoved && 'My removed watchlist'}
    </Heading>
  );
}

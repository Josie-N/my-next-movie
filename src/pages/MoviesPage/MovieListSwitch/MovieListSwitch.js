import React from 'react';
import EmptyScreen from "../../../components/generic/EmptyScreen/EmptyScreen";
import MovieListRecommended from "../MovieListRecommended/MovieListRecommended";
import MovieListUserAdded from "../MovieListUserAdded/MovieListUserAdded";
import useWatchlistName from "../../../hooks/useWatchlistName";
import { useStore } from "../../../store/store";
import useMovieList from "../../../hooks/useMoviesData";
import { getRecommendedMovieList } from "../../../services/api";

function MovieListSwitch () {
  const { isLoading, movies } = useMovieList(getRecommendedMovieList);
  const { watchlistNameRecommended, watchlistNameAdded, watchlistNameRemoved } = useWatchlistName();
  const howManyMoviesAddedList = useStore(state => state.howManyMoviesAddedList);
  const howManyMoviesRemovedList = useStore(state => state.howManyMoviesRemovedList);

  const isScreenEmpty =
    !isLoading && (
      (watchlistNameRecommended && movies.length === 0)
      ||
      (watchlistNameAdded && howManyMoviesAddedList === 0)
      ||
      (watchlistNameRemoved && howManyMoviesRemovedList === 0)
    );

  return (
    <>
      {isScreenEmpty ?
        <EmptyScreen />
        :
        <>
          {watchlistNameRecommended ? <MovieListRecommended /> : null}
          {watchlistNameAdded ? <MovieListUserAdded /> : null}
          {watchlistNameRemoved ? <p>You've been removed!</p> : null}
        </>
      }
    </>
  );
}

export default MovieListSwitch;
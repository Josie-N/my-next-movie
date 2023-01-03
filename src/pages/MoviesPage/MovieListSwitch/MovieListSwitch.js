import React from 'react';

import { MovieListType } from "../../../constants/constants";
import { useStore } from "../../../store/store";
import { getRecommendedMovieList } from "../../../services/api";
import useMovieList from "../../../hooks/useMovieList";

import MovieListRecommended from "../MovieListRecommended/MovieListRecommended";
import MovieListUserAdded from "../MovieListUserAdded/MovieListUserAdded";
import EmptyScreen from "../../../components/generic/EmptyScreen/EmptyScreen";


function MovieListSwitch () {
  const { isLoading, movies } = useMovieList(getRecommendedMovieList);
  const movieCountAddedList = useStore(state => state.movieCountAddedList);
  const movieCountRemovedList = useStore(state => state.movieCountRemovedList);
  const movieListType = useStore(state => state.movieListType);

  const isRecommendedListEmpty = movies.length === 0;
  const isAddedListEmpty = movieCountAddedList === 0;
  const isRemovedListEmpty = movieCountRemovedList === 0;

  switch (movieListType) {
    case MovieListType.Recommended:
      return !isLoading && isRecommendedListEmpty ? <EmptyScreen /> : <MovieListRecommended />
    case MovieListType.Added:
      return !isLoading && isAddedListEmpty ? <EmptyScreen /> : <MovieListUserAdded />
    case MovieListType.Removed:
      return !isLoading && isRemovedListEmpty ? <EmptyScreen /> : <p>You've been removed!</p>
    default:
      throw Error('Error! This movie list does not exist.')
  }
}

export default MovieListSwitch;

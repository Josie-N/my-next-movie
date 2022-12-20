import React from "react";

import useMovieList from "../../../hooks/useMovieList";
import { getAddedMovieList } from "../../../services/api";

import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";
import { useStore } from "../../../store/store";

const MovieListUserAdded = () => {
  const { movies } = useMovieList(getAddedMovieList);
  const setCurrentPage = useStore(state => state.setCurrentPage);

  // Runs when user clicks button to see more movies
  const handleLoadMoreMovies = () => {
    setCurrentPage();
  }

  return (
    <>
      <MovieList movies={movies} />
      <LoadMoreMovies handleLoadMoreMovies={handleLoadMoreMovies} />
    </>
  )
}

export default MovieListUserAdded;
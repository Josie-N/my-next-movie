import React from "react";
import { useStore } from "../../../store/store";

import useMovieList from "../../../hooks/useMovieList";
import { getAddedMovieList } from "../../../services/movieList";

import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";

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
import React from "react";

import useMovieList from "../../../hooks/useMoviesData";
import { getAddedMovieList } from "../../../services/api";

import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";

const MovieListUserAdded = () => {
  const {
    movies,
    totalPageCount,
    currentPage,
    setCurrentPage,
    numberOfMoviesPerPage
  } = useMovieList(getAddedMovieList);

  // Runs when user clicks button to see more movies
  const handleLoadMoreMovies = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <>
      <MovieList movies={movies}
                 numberOfMoviesPerPage={numberOfMoviesPerPage}
      />
      <LoadMoreMovies currentPage={currentPage}
                      totalPageCount={totalPageCount}
                      handleLoadMoreMovies={handleLoadMoreMovies}
      />
    </>
  )
}

export default MovieListUserAdded;
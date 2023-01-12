import React from "react";

import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";
import useQueryListAdded from "./hooks/useQueryListAdded";

const MovieListUserAdded = () => {
  const { movies: addedMovies, fetchNextPage, hasNextPage } = useQueryListAdded();

  // Runs when user clicks button to see more movies
  const handleLoadMoreMovies = () => {
    fetchNextPage();
  }
  
  return (
    <>
      <MovieList movies={addedMovies} />
      <LoadMoreMovies
        movies={addedMovies}
        handleLoadMoreMovies={handleLoadMoreMovies}
        hasNextPage={hasNextPage}
      />
    </>
  )
}

export default MovieListUserAdded;

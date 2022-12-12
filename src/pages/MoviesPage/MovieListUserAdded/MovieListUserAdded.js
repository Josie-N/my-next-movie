import React from 'react';
import { getAdddedMovieList } from "../../../services/api";
import useMovieList from "../../../hooks/useMoviesData";

import MovieCard from "../MovieCard/MovieCard";
import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";

function MovieListUserAdded () {
  // TO DO: Need a way to return back to recommended page

  const { movies, isLoading } = useMovieList(() => getAdddedMovieList());

  return (
    <div>
      {/*TO DO: You need a design for the empty screen*/}
      <h3>Added Movies</h3>
      {isLoading ?
        <LoadingIndicator />
        :
        movies && movies.map(movie => {
          return (
            <MovieCard movie={movie} />
          )
        })
      }
    </div>
  );
}

export default MovieListUserAdded;
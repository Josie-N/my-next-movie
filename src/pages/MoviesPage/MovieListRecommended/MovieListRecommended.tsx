import React, {useState} from "react";
import { useStore } from "../../../store/store";

import { numberOfMoviesPerPage } from "../../../constants/constants";
import useQueryList from "../../../hooks/useQueryList";

import getMovieListConfiguration from '../utils/movieListConfiguration';
import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";

const MovieListRecommended = () => {
  const movieListType = useStore(state => state.movieListType);

  const movieListConfig = getMovieListConfiguration(movieListType);
  const { movies: recommendedMovies, fetchNextPage, hasNextPage } = useQueryList(movieListConfig);

  const allRecommendedMovies = recommendedMovies.pagination.totalItems;
  const moviesAlreadyPaginated = recommendedMovies.data.length;

  // Returns remaining movies left to be paginated (hidden below the 'Show More' button)
  const initialValue = allRecommendedMovies - moviesAlreadyPaginated;
  const [hiddenMoviesCount, setHiddenMoviesCount] = useState(initialValue);

  const handleLoadMoreMovies = () => {
    fetchNextPage();
    setHiddenMoviesCount((allRecommendedMovies - numberOfMoviesPerPage) - moviesAlreadyPaginated);
  }

  return (
    <>
      <MovieList
        movies={recommendedMovies}
      />
      <LoadMoreMovies
        movies={recommendedMovies}
        handleLoadMoreMovies={handleLoadMoreMovies}
        hasNextPage={hasNextPage}
        numberOfMoviesNotPaginated={hiddenMoviesCount}
      />
    </>
  )
}

export default MovieListRecommended;

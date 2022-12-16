import React from "react";

import { useStore } from "../../../store/store";
import useMovieList from "../../../hooks/useMoviesData";
import { getRecommendedMovieList, postToAddedMovieList } from "../../../services/api";
import { getFilterMovieFromList } from "../utils/helper";

import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";

const MovieListRecommended = () => {
  const {
    movies,
    setMovies,
    totalPageCount,
    currentPage,
    setCurrentPage
  } = useMovieList(getRecommendedMovieList);

  // Data accessed from global store
  const increaseAddedListCount = useStore(state => state.increaseHowManyMoviesAddedList);
  const increaseRemovedListCount = useStore(state => state.increaseHowManyMovieRemovedList);

  // Runs when user adds a movie to recommended watchlist
  const handleMoveToAddedList = (_id, event) => {
    event.stopPropagation();

    // counter will also be updated on the BE side
    increaseAddedListCount();
    postToAddedMovieList(_id).catch(err => console.log(err.response.data));

    // Remove movie selected by id from list
    setMovies(getFilterMovieFromList(movies, _id));
  };

  // Runs when user adds a movie to blacklist
  const handleMoveToRemovedList = (_id, event) => {
    event.stopPropagation();
    increaseRemovedListCount();
    setMovies(getFilterMovieFromList(movies, _id));
  }

  // Runs when user clicks button to see more movies
  const handleLoadMoreMovies = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <>
      <MovieList movies={movies}
                 handleMoveToAddedList={handleMoveToAddedList}
                 handleMoveToRemovedList={handleMoveToRemovedList}
      />
      <LoadMoreMovies currentPage={currentPage}
                      totalPageCount={totalPageCount}
                      handleLoadMoreMovies={handleLoadMoreMovies}
      />
    </>
  )
}

export default MovieListRecommended;

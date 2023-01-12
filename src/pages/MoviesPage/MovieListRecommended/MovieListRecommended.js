import React from "react";
import { useStore } from "../../../store/store";

import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";
import useFilterMovieList from "./hooks/useFilterMovieList";
import useQueryListRecommended from "./hooks/useQueryListRecommended";

const MovieListRecommended = () => {
  const { movies: recommendedMovies, fetchNextPage, hasNextPage } = useQueryListRecommended();

  const setMovieCountAddedList = useStore(state => state.setMovieCountAddedList);
  const setMovieCountRemovedList = useStore(state => state.setMovieCountRemovedList);
  const filteredMovieList = useFilterMovieList();

  // Runs when user adds a movie to added watchlist
  const handleMoveToAddedList = (_id, event) => {
    event.stopPropagation();
    setMovieCountAddedList();

    // Send (not delete) movie from recommended list to added list
    filteredMovieList.mutate(_id);
  };

  // Runs when user adds a movie to removed watchlist
  const handleMoveToRemovedList = (_id, event) => {
    event.stopPropagation();
    setMovieCountRemovedList();

    // Send (not delete) movie from recommended list to removed list
    filteredMovieList.mutate(_id);
  }

  // Runs when user clicks button to see more movies
  const handleLoadMoreMovies = () => {
    fetchNextPage();
  }

  return (
    <>
      <MovieList
        movies={recommendedMovies}
        handleMoveToAddedList={handleMoveToAddedList}
        handleMoveToRemovedList={handleMoveToRemovedList}
      />
      <LoadMoreMovies
        handleLoadMoreMovies={handleLoadMoreMovies}
        hasNextPage={hasNextPage}
      />
    </>
  )
}

export default MovieListRecommended;

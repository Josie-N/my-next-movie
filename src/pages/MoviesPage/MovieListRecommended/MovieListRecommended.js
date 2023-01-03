import React from "react";

import { useStore } from "../../../store/store";
import useMovieList from "../../../hooks/useMovieList";
import { getRecommendedMovieList, postToAddedMovieList } from "../../../services/api";
import { getFilterMovieFromList } from "../utils/helper";

import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";

const MovieListRecommended = () => {
  const { movies, setMovies } = useMovieList(getRecommendedMovieList);

  // Data accessed from global store
  const setMovieCountAddedList = useStore(state => state.setMovieCountAddedList);
  const setMovieCountRemovedList = useStore(state => state.setMovieCountRemovedList);
  const username = useStore(state => state.username);
  const setCurrentPage = useStore(state => state.setCurrentPage);

  // Runs when user adds a movie to recommended watchlist
  const handleMoveToAddedList = (_id, event) => {
    event.stopPropagation();

    // Counter will also be updated on the BE side
    setMovieCountAddedList();
    postToAddedMovieList(_id, username).catch(err => console.log(err.response.data));

    // Remove movie selected by id from list
    setMovies(getFilterMovieFromList(movies, _id));
  };

  // Runs when user adds a movie to removed watchlist
  const handleMoveToRemovedList = (_id, event) => {
    event.stopPropagation();
    setMovieCountRemovedList();
    setMovies(getFilterMovieFromList(movies, _id));
  }

  // Runs when user clicks button to see more movies
  const handleLoadMoreMovies = () => {
    setCurrentPage();
  }

  return (
    <>
      <MovieList movies={movies}
                 handleMoveToAddedList={handleMoveToAddedList}
                 handleMoveToRemovedList={handleMoveToRemovedList}
      />
      <LoadMoreMovies handleLoadMoreMovies={handleLoadMoreMovies} />
    </>
  )
}

export default MovieListRecommended;

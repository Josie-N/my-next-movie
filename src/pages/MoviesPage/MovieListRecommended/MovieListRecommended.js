import React from "react";

import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";
import { useStore } from "../../../store/store";
import useFilterMovieList from "./hooks/useFilterMovieList";

const MovieListRecommended = () => {
  const setMovieCountAddedList = useStore(state => state.setMovieCountAddedList);
  // const setMovieCountRemovedList = useStore(state => state.setMovieCountRemovedList);
  const filteredMovieList = useFilterMovieList();

  // Runs when user adds a movie to added watchlist
  const handleMoveToAddedList = (_id, event) => {
    event.stopPropagation();
    // Counter will also be updated on the BE side
    setMovieCountAddedList();

    // Remove movie from recommended list
    filteredMovieList.mutate(_id);
  };


  // Runs when user adds a movie to removed watchlist
  // const handleMoveToRemovedList = (_id, event) => {
  //   event.stopPropagation();
  //   setMovieCountRemovedList();
  //   setMovies(getFilterMovieFromList(movies, _id));
  // }

  return (
    <>
      {filteredMovieList.isError && <h1>Post error!</h1>}
      {/*<MovieList movies={movies}*/}
      {/*           handleMoveToAddedList={handleMoveToAddedList}*/}
      {/*           handleMoveToRemovedList={handleMoveToRemovedList}*/}
      {/*/>*/}
      <MovieList handleMoveToAddedList={handleMoveToAddedList} />
      <LoadMoreMovies />
    </>
  )
}

export default MovieListRecommended;

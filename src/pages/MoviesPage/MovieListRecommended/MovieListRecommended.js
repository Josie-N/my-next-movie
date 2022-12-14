import React, { useState } from "react";
import useMovieList from "../../../hooks/useMoviesData";
import { useMovieListType } from "../../../store/store";
import { ADDED, RECOMMENDED, REMOVED } from "../../../constants/constants";
import { getRecommendedMovieList, postToAddedMovieList } from "../../../services/api";
import { getFilterMovieFromList } from "../utils/helper";

import styles from "./MovieListRecommended.module.css";
import helperStyles from "../../../assets/stylesheets/helper.module.css";

import MovieList from "../MovieList/MovieList";
import { WatchlistSidebar } from "../../../components/WatchlistSidebar/WatchlistSidebar";
import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";
import MovieListUserAdded from "../MovieListUserAdded/MovieListUserAdded";

const MovieListRecommended = () => {
  const {
    movies,
    setMovies,
    isLoading,
    totalPageCount,
    currentPage,
    setCurrentPage,
    numberOfMoviesPerPage
  } = useMovieList(getRecommendedMovieList);

  // Accessed from global store
  const watchlistName = useMovieListType(state => state.movieListType);

  const [watchlistAdd, setWatchlistAdd] = useState(0);
  const [watchlistRemove, setWatchlistRemove] = useState(0);

  // Runs when user adds a movie to recommended watchlist
  const handleMoveToAddedList = (_id, event) => {
    event.stopPropagation();

    // counter will also be updated on the BE side
    setWatchlistAdd(watchlistAdd + 1);
    postToAddedMovieList(_id).catch(err => console.log(err.response.data));

    // Remove movie selected by id from list
    setMovies(getFilterMovieFromList(movies, _id));
  };

  // Runs when user adds a movie to blacklist
  const handleMoveToRemovedList = (_id, event) => {
    event.stopPropagation();
    setWatchlistRemove(watchlistRemove + 1);
    setMovies(getFilterMovieFromList(movies, _id));
  }

  // Runs when user clicks button to see more movies
  const loadMoreMovies = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <>
      <div className={helperStyles.maxWidthDesktop}>
        <main className={styles.mainContentContainer}>
          <h2 className={helperStyles.visuallyHidden}>
            Browse all movies available:
          </h2>
          {isLoading ?
            <div className={styles.movieCardContainerSkeleton}>
              <LoadingIndicator />
            </div>
            :
            <div>
              {watchlistName === RECOMMENDED ?
                <MovieList movies={movies}
                           numberOfMoviesPerPage={numberOfMoviesPerPage}
                           handleMoveToAddedList={handleMoveToAddedList}
                           handleMoveToRemovedList={handleMoveToRemovedList}
                />
                : null
              }
              {watchlistName === ADDED ? <MovieListUserAdded /> : null}
              {watchlistName === REMOVED ? <p>You've been removed!</p> : null}
              <LoadMoreMovies currentPage={currentPage}
                              totalPageCount={totalPageCount}
                              loadMoreMovies={loadMoreMovies}
              />
            </div>
          }
          {isLoading ?
            <LoadingIndicator />
            :
            <WatchlistSidebar
              watchlistAdd={watchlistAdd}
              watchlistRemove={watchlistRemove}
            />
          }
        </main>
      </div>
    </>
  )
}

export default MovieListRecommended;

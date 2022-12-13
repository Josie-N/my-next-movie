import React, { useState } from "react";
import useMovieList from "../../hooks/useMoviesData";
import { getRecommendedMovieList, postToAddedMovieList } from "../../services/api";

import styles from "./MovieListRecommended.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";

import MovieList from "./MovieList/MovieList";
import { WatchlistSidebar } from "../../components/WatchlistSidebar/WatchlistSidebar";
import LoadingIndicator from "../../components/generic/LoadingIndicator/LoadingIndicator";
import LoadMoreMovies from "./LoadMoreMovies/LoadMoreMovies";
import MovieListUserAdded from "./MovieListUserAdded/MovieListUserAdded";

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
  const [movieListType, setMovieListType] = useState('recommended');
  const [watchlistAdd, setWatchlistAdd] = useState(0);
  const [watchlistRemove, setWatchlistRemove] = useState(0);

  // Runs when user adds a movie to recommended watchlist
  const handleButtonAdd = (movie, event) => {
    event.stopPropagation();

    // counter will also be updated on the BE side
    setWatchlistAdd(watchlistAdd + 1);
    postToAddedMovieList(movie._id).catch(err => console.log(err.response.data));

    // Remove item from list
    setMovies(movies.filter(movies => movie._id !== movies._id));
  };

  // Runs when user adds a movie to blacklist
  const handleButtonRemove = (event) => {
    event.stopPropagation();
    setWatchlistRemove(watchlistRemove + 1);
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
              {movieListType === 'recommended' ?
                <MovieList movies={movies}
                           numberOfMoviesPerPage={numberOfMoviesPerPage}
                           handleButtonAdd={handleButtonAdd}
                           handleButtonRemove={handleButtonRemove} />
                : null
              }
              {movieListType === 'added' ? <MovieListUserAdded /> : null}
              {movieListType === 'removed' ? <p>You've been removed!</p> : null}
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
              setMovieListType={setMovieListType}
            />
          }
        </main>
      </div>
    </>
  )
}

export default MovieListRecommended;

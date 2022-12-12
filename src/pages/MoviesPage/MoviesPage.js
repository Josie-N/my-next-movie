import React, { useState } from "react";
import useMoviesPage from "../../hooks/useMoviesData";

import styles from "./MoviesPage.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";

import MovieList from "./MovieList/MovieList";
import { WatchlistSidebar } from "../../components/WatchlistSidebar/WatchlistSidebar";
import LoadingIndicator from "../../components/generic/LoadingIndicator/LoadingIndicator";
import LoadMoreMovies from "./LoadMoreMovies/LoadMoreMovies";
import { postMovietoAddedList } from "../../services/api";

const MoviesPage = () => {
  const { movies, isLoading, totalPageCount, currentPage, setCurrentPage, numberOfMoviesPerPage } = useMoviesPage();
  const [watchlistAdd, setWatchlistAdd] = useState(0);
  const [watchlistRemove, setWatchlistRemove] = useState(0);

  // Runs when user adds a movie to recommended watchlist
  const handleButtonAdd = (movie, event) => {
    event.stopPropagation();
    setWatchlistAdd(watchlistAdd + 1);
    postMovietoAddedList(movie._id).catch(err => console.log(err.response.data));

    // next: update the global store
    // function to remove item from list
    // movies.filter(movie => movie._id !== id)

  };

  // Runs when user removes a movie and adds it to blacklist
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
              <MovieList movies={movies}
                         numberOfMoviesPerPage={numberOfMoviesPerPage}
                         handleButtonAdd={handleButtonAdd}
                         handleButtonRemove={handleButtonRemove}
              />
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

export default MoviesPage;

import React from "react";
import useMoviesPage from "../../hooks/useMoviesData";

import styles from "./MoviesPage.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";

import MovieList from "./MovieList/MovieList";
import { WatchlistSidebar } from "../../components/WatchlistSidebar/WatchlistSidebar";
import LoadingIndicator from "../../components/generic/LoadingIndicator/LoadingIndicator";
import LoadMoreMovies from "./LoadMoreMovies/LoadMoreMovies";

const MoviesPage = () => {
  const { movies, isLoading, totalPageCount, currentPage, setCurrentPage, numberOfMoviesPerPage } = useMoviesPage();

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
              <MovieList movies={movies} numberOfMoviesPerPage={numberOfMoviesPerPage} />
              <LoadMoreMovies currentPage={currentPage}
                              totalPageCount={totalPageCount}
                              loadMoreMovies={loadMoreMovies}
              />
            </div>
          }
          {isLoading ?
            <LoadingIndicator />
            :
            <WatchlistSidebar />
          }
        </main>
      </div>
    </>
  )
}

export default MoviesPage;

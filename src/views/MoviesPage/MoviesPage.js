import React from "react";
import useMoviesPageData from "../../hooks/useMoviesData";

import styles from "./MoviesPage.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";

import Spinner from "../../components/generic/Spinner/Spinner";
import Button from "../../components/generic/Button/Button";
import MovieList from "../../components/MovieList/MovieList";
import { WatchlistSidebar } from "../../components/WatchlistSidebar/WatchlistSidebar";

const MoviesPage = () => {
  const { movies, isLoading, totalPageCount, currentPage, setCurrentPage, numberOfMoviesPerPage } = useMoviesPageData();

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
              <Spinner />
            </div>
            :
            <div>
              <MovieList movies={movies} numberOfMoviesPerPage={numberOfMoviesPerPage} />
              {/*// Move load more button to its own component*/}
              {/*// Can you reuse <Button />?*/}
              <div className={styles.showMoreMovies}>
                {
                  (currentPage === totalPageCount) ?
                    <h4>No more movies to load.</h4>
                    :
                    <Button ariaLabel="Show more movies" hasIcon icon="👇" type="button"
                            handleButtonClick={loadMoreMovies}>
                      <span>SHOW MORE</span>
                    </Button>
                }
              </div>
            </div>
          }
          {isLoading ?
            <Spinner />
            :
            <WatchlistSidebar />
          }
        </main>
      </div>
    </>
  )
}

export default MoviesPage;

import React from 'react';
import helperStyles from "../../../assets/stylesheets/helper.module.css";
import styles from "./MoviesPage.module.css";

import MovieListSwitch from "../MovieListSwitch/MovieListSwitch";
import MovieListHeaderScreenReader from "../MovieListHeadlineScreenReader/MovieListHeadlineScreenReader";
import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";
import { WatchlistSidebar } from "../../../components/WatchlistSidebar/WatchlistSidebar";
import useListRecommendedQuery from "../MovieListRecommended/hooks/useQueryListRecommended";

function MoviesPage () {
  const { isLoading: isLoadingMovies } = useListRecommendedQuery();

  return (
    <>
      <div className={helperStyles.maxWidthDesktop}>
        <main className={styles.mainContentContainer}>
          <MovieListHeaderScreenReader />
          {isLoadingMovies ?
            <div className={styles.movieCardContainerSkeleton}>
              <LoadingIndicator />
            </div>
            :
            // TO DO: Add an Error Boundary here
            <div className={styles.movieListContainer}>
              <MovieListSwitch />
            </div>
          }
          {isLoadingMovies ? <LoadingIndicator /> : <WatchlistSidebar />}
        </main>
      </div>
    </>
  );
}

export default MoviesPage;
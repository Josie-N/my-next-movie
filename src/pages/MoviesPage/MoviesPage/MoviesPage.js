import React from 'react';
import { ErrorBoundary } from "react-error-boundary";

import helperStyles from "../../../assets/stylesheets/helper.module.css";
import styles from "./MoviesPage.module.css";

import useListRecommendedQuery from "../MovieListRecommended/hooks/useQueryListRecommended";
import MovieListSwitch from "../MovieListSwitch/MovieListSwitch";
import MovieListHeaderScreenReader from "../MovieListHeadlineScreenReader/MovieListHeadlineScreenReader";
import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";
import { WatchlistSidebar } from "../../../components/WatchlistSidebar/WatchlistSidebar";
import { ErrorFallback } from "../../../components/ErrorFallback/ErrorFallback";

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
            <div className={styles.movieListContainer}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <MovieListSwitch />
              </ErrorBoundary>
            </div>
          }
          {isLoadingMovies ? <LoadingIndicator /> : <WatchlistSidebar />}
        </main>
      </div>
    </>
  );
}

export default MoviesPage;
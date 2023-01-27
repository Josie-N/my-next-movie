import React from 'react';
import { useStore } from "../../../store/store";
import { ErrorBoundary } from "react-error-boundary";

import helperStyles from "../../../assets/stylesheets/helper.module.css";
import styles from "./MoviesPage.module.css";

import useQueryList from "../../../hooks/useQueryList";
import getMovieListConfiguration from "../utils/movieListConfiguration";

import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";
import { ErrorFallback } from "../../../components/ErrorFallback/ErrorFallback";
import MovieListHeaderScreenReader from "../MovieListHeadlineScreenReader/MovieListHeadlineScreenReader";
import MovieListSwitch from "../MovieListSwitch/MovieListSwitch";
import Watchlist from "../../../components/Watchlist/Watchlist";
import UserAccount from "../UserAccount/UserAccount";
import Sidebar from "../Sidebar/Sidebar";

function MoviesPage () {
  const movieListType = useStore(state => state.movieListType);

  const movieListConfig = getMovieListConfiguration(movieListType);
  const { isLoading: isLoadingMovies } = useQueryList(movieListConfig);

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
          <Sidebar>
            <UserAccount />
            <Watchlist />
            {/*Watchlist is confusing, try instead*/}
            {/*WatchlistSelection*/}
            {/*WatchlistNavigation*/}
          </Sidebar>
        </main>
      </div>
    </>
  );
}

export default MoviesPage;

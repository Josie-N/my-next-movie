import React, { useEffect } from 'react';
import helperStyles from "../../../assets/stylesheets/helper.module.css";
import styles from "./MoviesPage.module.css";

import { useStore } from "../../../store/store";
import { getRecommendedMovieList } from "../../../services/api";
import useMovieList from "../../../hooks/useMovieList";
import { getFormatToLowercase, getGenerateUsername } from "../utils/helper";

import MovieListSwitch from "../MovieListSwitch/MovieListSwitch";
import MovieListHeaderScreenReader from "../MovieListHeadlineScreenReader/MovieListHeadlineScreenReader";
import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";
import { WatchlistSidebar } from "../../../components/WatchlistSidebar/WatchlistSidebar";

function MoviesPage () {
  const createUsername = useStore(state => state.setUsername);

  useEffect(() => {
    const username = getFormatToLowercase(getGenerateUsername());
    createUsername(username);
  }, []);

  const { isLoading } = useMovieList(getRecommendedMovieList);

  return (
    <>
      <div className={helperStyles.maxWidthDesktop}>
        <main className={styles.mainContentContainer}>
          <MovieListHeaderScreenReader />
          {isLoading ?
            <div className={styles.movieCardContainerSkeleton}>
              <LoadingIndicator />
            </div>
            :
            <div className={styles.movieListContainer}>
              <MovieListSwitch />
            </div>
          }
          {isLoading ? <LoadingIndicator /> : <WatchlistSidebar />}
        </main>
      </div>
    </>
  );
}

export default MoviesPage;
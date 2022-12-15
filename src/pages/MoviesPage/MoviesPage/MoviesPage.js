import React from 'react';
import helperStyles from "../../../assets/stylesheets/helper.module.css";
import styles from "./MoviesPage.module.css";

import { getRecommendedMovieList } from "../../../services/api";
import useMovieList from "../../../hooks/useMoviesData";
import useWatchlistName from "../../../hooks/useWatchlistName";

import MovieListRecommended from "../MovieListRecommended/MovieListRecommended";
import MovieListUserAdded from "../MovieListUserAdded/MovieListUserAdded";
import MovieListHeaderScreenReader from "../MovieListHeadlineScreenReader/MovieListHeadlineScreenReader";
import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";
import { WatchlistSidebar } from "../../../components/WatchlistSidebar/WatchlistSidebar";

function MoviesPage () {
  const { isLoading } = useMovieList(getRecommendedMovieList);
  const { watchlistNameRecommended, watchlistNameAdded, watchlistNameRemoved } = useWatchlistName();

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
            <div>
              {watchlistNameRecommended ? <MovieListRecommended /> : null}
              {watchlistNameAdded ? <MovieListUserAdded /> : null}
              {watchlistNameRemoved ? <p>You've been removed!</p> : null}
            </div>
          }
          {isLoading ? <LoadingIndicator /> : <WatchlistSidebar />}
        </main>
      </div>
    </>
  );
}

export default MoviesPage;
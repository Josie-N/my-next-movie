import React from 'react';
import { useStore } from "../../../store/store";
import { ErrorBoundary } from "react-error-boundary";

import styles from "./MoviesPage.module.css";

import useQueryList from "../../../hooks/useQueryList";
import getMovieListConfiguration from "../utils/movieListConfiguration";

import { ErrorFallback } from "src/components/ErrorFallback/ErrorFallback";
import LayoutDesktop from "src/components/LayoutDesktop/LayoutDesktop";
import SelectedWatchlistHeadingA11y from "../SelectedWatchlistHeadingA11y/SelectedWatchlistHeadingA11y";
import MovieListSwitch from "../MovieListSwitch/MovieListSwitch";
import Sidebar from "../Sidebar/Sidebar";
import WatchlistNavigation from "../WatchlistNavigation/WatchlistNavigation";
import MovieListSkeleton from '../MovieListSkeleton/MovieListSkeleton';
import UserAccountMenu from '../UserAccountMenu/UserAccountMenu';

// Top level structure of MoviesPage view
export default function MoviesPage() {
  const movieListType = useStore(state => state.movieListType);

  const movieListConfig = getMovieListConfiguration(movieListType);
  const { isLoading: isLoadingMovies } = useQueryList(movieListConfig);

  return (
    <LayoutDesktop>
      <main className={styles.mainContentContainer}>
        <SelectedWatchlistHeadingA11y />
        {isLoadingMovies ?
          <MovieListSkeleton /> :
          <div className={styles.movieListContainer}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <MovieListSwitch />
            </ErrorBoundary>
          </div>
        }
        <Sidebar>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <UserAccountMenu />
            <WatchlistNavigation />
          </ErrorBoundary>
        </Sidebar>
      </main>
    </LayoutDesktop>
  );
}

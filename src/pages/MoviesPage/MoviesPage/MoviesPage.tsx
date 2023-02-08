import React from 'react';
import { ErrorBoundary } from "react-error-boundary";

import styles from "./MoviesPage.module.css";

import ErrorFallback from "src/components/ErrorFallback/ErrorFallback";
import LayoutDesktop from "src/components/LayoutDesktop/LayoutDesktop";
import MovieListSwitch from "../MovieListSwitch/MovieListSwitch";
import MainContent from '../MainContent/MainContent';
import Sidebar from "../Sidebar/Sidebar";
import WatchlistNavigation from "../WatchlistNavigation/WatchlistNavigation";
import UserAccountMenu from '../UserAccountMenu/UserAccountMenu';

// Top level structure of MoviesPage view
const MoviesPage = () => {
  return (
    <LayoutDesktop>
      <main className={styles.mainContentContainer}>
        <MainContent>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MovieListSwitch />
          </ErrorBoundary>
        </MainContent>
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

export default MoviesPage;

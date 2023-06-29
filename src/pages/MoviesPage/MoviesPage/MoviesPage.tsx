import React, {useState} from 'react';
import {ErrorBoundary} from "react-error-boundary";
import {useNewAccountFormStore} from "../../../store/store";

import styles from "./MoviesPage.module.css";

import ErrorFallback from "src/components/ErrorFallback/ErrorFallback";
import LayoutDesktop from "src/components/LayoutDesktop/LayoutDesktop";
import MovieListSwitch from "../MovieListSwitch/MovieListSwitch";
import {MainContent} from '../MainContent/MainContent';
import {Sidebar} from "../Sidebar/Sidebar";
import UserAccountMenu from "../UserAccountMenu/UserAccountMenu";
import WatchlistNavigation from "../WatchlistNavigation/WatchlistNavigation";
import {FormCreateUserLogic} from "../FormCreateUserLogic/FormCreateUserLogic";


// Top level structure of MoviesPage view
const MoviesPage = () => {
  const createNewAccount = useNewAccountFormStore(state => state.isNewAccountForm);

  return (
    <LayoutDesktop>
      <main className={styles.mainContentContainer}>
        <MainContent>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {createNewAccount ?
              <FormCreateUserLogic/>
              :
              <MovieListSwitch/>
            }
          </ErrorBoundary>
        </MainContent>
        <Sidebar>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {createNewAccount ? null :
              <>
                <UserAccountMenu/>
                <WatchlistNavigation/>
              </>
            }
          </ErrorBoundary>
        </Sidebar>
      </main>
    </LayoutDesktop>
  );
}

export default MoviesPage;

import React from "react";
import { useStore } from "../../../store/store";
import classNames from "classnames/bind";

import styles from "./MainContent.module.css";

import getMovieListConfiguration from "../utils/movieListConfiguration";
import useQueryList from "../../../hooks/useQueryList";
import useWatchlistName from "../../../hooks/useWatchlistName";
import MovieListSkeleton from "../MovieListSkeleton/MovieListSkeleton";
import SelectedWatchlistHeadingA11y from "../SelectedWatchlistHeadingA11y/SelectedWatchlistHeadingA11y";

type Props = {
  children: React.ReactNode
}

export function MainContent({ children }: Props) {
  const movieListType = useStore(state => state.movieListType);
  const movieListConfig = getMovieListConfiguration(movieListType);

  const { isLoading: isLoadingMovies, hasNextPage } = useQueryList(movieListConfig);
  const { watchlistNameRecommended } = useWatchlistName();

  const cn = classNames.bind(styles);
  const movieListContainerClassNames = cn(
    'movieListContainer',
    // if it's not on the recommended list and there is no next page
    { 'movieListContainer__bottomSpacing': !(watchlistNameRecommended || hasNextPage) }
  );

  return (
    <>
      {isLoadingMovies ?
        <MovieListSkeleton /> :
        <>
          <SelectedWatchlistHeadingA11y />
          <div className={movieListContainerClassNames}>
            {children}
          </div>
        </>
      }
    </>
  );
}

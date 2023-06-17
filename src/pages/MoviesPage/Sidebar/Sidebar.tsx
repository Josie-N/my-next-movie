import React from "react";
import { useStore } from "../../../store/store";

import getMovieListConfiguration from "../utils/movieListConfiguration";
import { getSidebarStyles } from "./utils/helper";
import useQueryList from "../../../hooks/useQueryList";
import usePageScroll from "./hooks/usePageScroll";
import bunny from "../../../assets/images/bunny.png";

import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";

type Props = {
  children?: React.ReactNode
}

export function Sidebar({ children }: Props) {
  const movieListType = useStore(state => state.movieListType);

  const movieListConfig = getMovieListConfiguration(movieListType);
  const { isLoading: isLoadingMovies } = useQueryList(movieListConfig);

  const isPageScrolledDown = usePageScroll();
  const sidebarContainerClassNames = getSidebarStyles(isPageScrolledDown);

  return (
    <>
      {
        isLoadingMovies ?
          <LoadingIndicator />
          :
            <>
          <aside className={sidebarContainerClassNames}>
            {children}
            <img alt="back to top" src={bunny} />
          </aside>
            </>
      }
    </>
  );
}

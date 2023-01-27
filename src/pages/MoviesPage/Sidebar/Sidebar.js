import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";
import React from "react";
import useQueryList from "../../../hooks/useQueryList";
import { useStore } from "../../../store/store";
import getMovieListConfiguration from "../utils/movieListConfiguration";
import { getSidebarStyles } from "./utils/helper";
import usePageScroll from "../../../components/Watchlist/hooks/usePageScroll";

function Sidebar ({ children }) {
  const movieListType = useStore(state => state.movieListType);

  const movieListConfig = getMovieListConfiguration(movieListType);
  const { isLoading: isLoadingMovies } = useQueryList(movieListConfig);

  const isPageScrolledDown = usePageScroll(); // always false

  console.log(isPageScrolledDown, 'isPageScrolledDown Sidebar')

  const sidebarContainerClassNames = getSidebarStyles(isPageScrolledDown);

  return (
    <>
      {
        isLoadingMovies ?
          <LoadingIndicator />
          :
          <aside className={sidebarContainerClassNames}>
            {children}
          </aside>
      }
    </>
  );
}

export default Sidebar;

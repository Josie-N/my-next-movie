import React, {useEffect} from "react";
import {useStore} from "../../../store/store";
import useBookmarkStore from "../../../store/bookmarkStore";
import styles from "./Sidebar.module.css";

import getMovieListConfiguration from "../utils/movieListConfiguration";
import {getSidebarStyles} from "./utils/helper";
import useQueryList from "../../../hooks/useQueryList";
import usePageScroll from "./hooks/usePageScroll";
import bunny from "../../../assets/images/bunny_thiner.png";

import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";

type Props = {
  children?: React.ReactNode
}

export function Sidebar({children}: Props) {
  const movieListType = useStore(state => state.movieListType);

  // Zustand was added here
  const setNextBookmarkId = useBookmarkStore(state => state.setNextBookmarkId);

  const movieListConfig = getMovieListConfiguration(movieListType);
  const {isLoading: isLoadingMovies} = useQueryList(movieListConfig);

  const isPageScrolledDown = usePageScroll();
  const sidebarContainerClassNames = getSidebarStyles(isPageScrolledDown);

  const handleScrollToID = () => {
    const divElement = document.getElementById(setNextBookmarkId());
    divElement?.scrollIntoView({behavior: 'smooth', block: "center", inline: "nearest"});
  };

  return (
    <>
      {
        isLoadingMovies ?
          <LoadingIndicator/>
          :
          <>
            <aside className={sidebarContainerClassNames}>
              {children}
              <img className={styles.bunnyNavigation} onClick={handleScrollToID} alt="" src={bunny}/>
            </aside>
          </>
      }
    </>
  );
}

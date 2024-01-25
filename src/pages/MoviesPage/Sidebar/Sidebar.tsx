import React, {useEffect} from "react";
import {useStore} from "../../../store/store";
import useBookmarkStore from "../../../store/bookmarkStore";
import styles from "./Sidebar.module.css";

import getMovieListConfiguration from "../utils/movieListConfiguration";
import {getSidebarStyles} from "./utils/helper";
import useQueryList from "../../../hooks/useQueryList";
import usePageScroll from "./hooks/usePageScroll";

import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";
import rabbitIllustration from "../../../assets/images/rabbit.png";

type Props = {
  children?: React.ReactNode
}

export function Sidebar({children}: Props) {
  const movieListType = useStore(state => state.movieListType);
  const getNextBookmarkId = useBookmarkStore(state => state.getNextBookmarkId);

  const movieListConfig = getMovieListConfiguration(movieListType);
  const {isLoading: isLoadingMovies} = useQueryList(movieListConfig);

  const isPageScrolledDown = usePageScroll();
  const sidebarContainerClassNames = getSidebarStyles(isPageScrolledDown);

  const handleScrollToID = () => {
    const divElement = document.getElementById(getNextBookmarkId());
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
              <img className={styles.bunnyNavigation} onClick={handleScrollToID} alt="" src={rabbitIllustration}/>
            </aside>
          </>
      }
    </>
  );
}

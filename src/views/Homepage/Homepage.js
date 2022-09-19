import React, { useEffect, useState } from "react";
import Button from "../../components/generic/Button/Button";
import { WatchlistSidebar } from "../../components/WatchlistSidebar/WatchlistSidebar";

import styles from "./Homepage.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import Spinner from "../../components/generic/Spinner/Spinner";

export const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const numberOfMoviesPerPage = 5;

  useEffect(() => {
      fetch(`https://josie-moviehut.herokuapp.com/api/movies?page=${currentPage}&limit=${numberOfMoviesPerPage}`)
        .then(response => response.json())
        .then(json => {
          const { pagination, data } = json;

          setMovies([...movies, ...data]);
          setTotalPageCount(pagination.totalPages);
        })
        .catch(error => {
          console.error(error);
        });

      setLoading(false);
    }, [currentPage]
  );

  const loadMoreMovies = () => {
    setCurrentPage(currentPage + 1);
  }

  const loadMoreButton =
    (currentPage === totalPageCount) ?
      <h4>No more movies to load.</h4>
      :
      <Button hasIcon icon="👇" type="button" handleButtonClick={loadMoreMovies}>
        <span>SHOW MORE</span>
      </Button>

  return (
    <>
      <div className={helperStyles.maxWidthDesktop}>
        <main className={styles.mainContentContainer}>
          <h2 className={helperStyles.visuallyHidden}>
            Browse all movies available:
          </h2>
          <div>
            {/*To do: move into its own MovieCardPage component*/}
            {isLoading ?
              <div className={styles.movieCardContainerSkeleton}>
                <Spinner />
              </div>
              :
              <div className={styles.movieCardContainer}>
                {movies && movies.map((movie, index) => {
                  const quotient = index / numberOfMoviesPerPage;

                  const divisionRemainder = index % numberOfMoviesPerPage;

                  // 4, 9, 14, 19, ...
                  const indexOfLastCardOnEachPage = (numberOfMoviesPerPage - 1);

                  // 0, 5, 10, 15, ...
                  const indexOfFirstCardOnEachPage = (numberOfMoviesPerPage - 5);

                  return (
                    <MovieCard key={movie._id}
                               movie={movie}
                               pageNumber={Math.floor(quotient) + 1}
                               showPageNumberOnLastCard={divisionRemainder === indexOfLastCardOnEachPage}
                               showPageNumberOnFirstCard={divisionRemainder === indexOfFirstCardOnEachPage}
                    />
                  );
                })}
              </div>
            }
            <div className={styles.showMoreMovies}>
              {loadMoreButton}
            </div>
          </div>
          {isLoading ?
            <Spinner /> :
            <WatchlistSidebar />
          }
        </main>
      </div>
    </>
  )
}

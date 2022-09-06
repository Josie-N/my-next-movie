import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Button from "../../components/generic/Button/Button";
import { WatchlistSidebar } from "../../components/WatchlistSidebar/WatchlistSidebar";

import styles from "./MoviesPage.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";


function MoviesPage () {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const numberOfMoviesPerPage = 5;
  const movieCount = movies.length;

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem(`pageNumber`, pageNumber);
  }

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

  if (isLoading) return <pre>LOADING...</pre>
  if (movieCount < 1) return <h2>There are no movies in the database.</h2>

  return (
    <>
      <header className={styles.header}>
      <main className={styles.mainContentContainer}>
        <h2 className={helperStyles.visuallyHidden}>
          Browse all movies available:
        </h2>
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
          <div className={styles.showMoreMovies}>
            {loadMoreButton}
          </div>
        </div>

          <WatchlistSidebar />
        </main>
    </>
  )
}

export default MoviesPage;
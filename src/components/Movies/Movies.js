import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import MovieCard from "../MovieCard/MovieCard";

import styles from "./Movies.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";
import logo from "../../assets/images/brandHeaderLogo.svg";


function Movies () {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState([]);

  const initialPage = 1;
  const lastCurrentPage = parseInt(window.localStorage.getItem("pageNumber"));
  const [currentPage, setCurrentPage] = useState(lastCurrentPage ? lastCurrentPage : initialPage);

  const movieCount = movies.length;

  useEffect(() => {
      fetch(`https://josie-moviehut.herokuapp.com/api/movies?page=${currentPage}&limit=5`)
        .then(response => response.json())
        .then(json => {
          const { pagination, data } = json;

          setMovies(data);
          setTotalPageCount(pagination.totalPages);
        })
        .catch(error => {
          console.error(error);
        });

      setLoading(false);
    }, [currentPage]
  );

  // const handleDelete = (movies, movie) => {
  //   const filteredMovies = movies.filter(m => m._id !== movie._id);
  //
  //   // We update the initial movie list using setMovies()
  //   setMovies(filteredMovies);
  // }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem(`pageNumber`, pageNumber);
  }

  if (isLoading) return <pre>LOADING...</pre>
  if (movieCount < 1) return <h2>There are no movies in the database.</h2>

  return (
    <>
      <header className={styles.header}>
        <h1 className={helperStyles.visuallyHidden}>
          The tale of, a movie search database
        </h1>
        <span>
          <a onClick={() => handlePageChange(initialPage)} href="/">
            <img className={styles.brandLogo} src={logo} alt="Brand logo" aria-hidden />
          </a>
        </span>
        <div className={styles.mainNavigationContainer}>
          <p className={styles.genreTextIntro}>I'm looking for:</p>
          <Pagination
            totalPageCount={totalPageCount}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </header>
      <main className={styles.mainContentContainer}>
        <h3 className={helperStyles.visuallyHidden}>
          Browse all movies available:
        </h3>
        <div className={styles.movieCardContainer}>
          {movies.map(movie => {
            return (
              <MovieCard key={movie._id} movie={movie} />)
          })}
        </div>
        {/*To do: move into its own Watchlist component*/}
        <aside className={styles.watchlistContainer}>
          <ul className={styles.watchlist}>
            <h3 className={styles.watchlistTitle}>Watchlist:</h3>
            <li>
              <a href="/">😊 Yes (32)</a>
            </li>
            <li>
              <a href="/">😕 No (2)</a>
            </li>
          </ul>
        </aside>
      </main>
    </>
  )
}

export default Movies;
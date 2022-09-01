import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Button from "../../components/generic/Button/Button";

import styles from "./MoviesPage.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";
import logo from "../../assets/images/brandHeaderLogo.svg";


function MoviesPage () {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const initialPage = 1;
  const lastCurrentPage = parseInt(window.localStorage.getItem("pageNumber"));
  const [currentPage, setCurrentPage] = useState(lastCurrentPage ? lastCurrentPage : initialPage);

  const movieCount = movies.length;

  useEffect(() => {
      fetch(`https://josie-moviehut.herokuapp.com/api/movies?page=${currentPage}&limit=5`)
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
        <h1 className={helperStyles.visuallyHidden}>
          The tale of, a movie search database
        </h1>
        <span>
          <a onClick={() => handlePageChange(initialPage)} href="/">
            <img className={styles.brandLogo} src={logo} alt="Brand logo" aria-hidden />
          </a>
        </span>
        <div className={styles.mainNavigationContainer}>
          {/*<p className={styles.genreTextIntro}>I'm looking for:</p>*/}
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
          <div className={styles.showMoreMovies}>
            {loadMoreButton}
          </div>
        </div>
        {/*To do: move into its own Watchlist component*/}
        <aside className={styles.watchlistContainer}>
          <ul className={styles.watchlist}>
            <h3 className={styles.watchlistTitle}>My watchlist:</h3>
            <li>
              <a href="/">
                <span className={styles.emoji}>👍 </span>
                Added (32)
              </a>
            </li>
            <li>
              <a href="/">
                <span className={styles.emoji}>👀 </span>
                Already seen (5)
              </a>
            </li>
            <li>
              <a href="/">
                <span className={styles.emoji}>👎 </span>
                Removed (2)
              </a>
            </li>
          </ul>
          {/*<Pagination*/}
          {/*  totalPageCount={totalPageCount}*/}
          {/*  onPageChange={handlePageChange}*/}
          {/*  currentPage={currentPage}*/}
          {/*/>*/}
        </aside>
      </main>
    </>
  )
}

export default MoviesPage;
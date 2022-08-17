import React, { useEffect, useState } from "react";
import MovieList from "../MovieList";
import Pagination from "../Pagination";
import styles from "./Movies.module.css";

function Movies () {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
      fetch(`https://josie-moviehut.herokuapp.com/api/movies?page=${currentPage}&limit=10`)
        .then(response => response.json())
        .then(json => {
          const { pagination, data } = json;
          console.log('json: ', json);
          console.log('pagination.next:  ', pagination.next)

          setMovies(data);
          setTotalPageCount(pagination.totalPages);
        })
        .catch(error => {
          console.error(error);
        });

      setLoading(false);
    }, [currentPage]
  );

  const handleDelete = (movies, movie) => {
    const filteredMovies = movies.filter(m => m._id !== movie._id);

    // We update the initial movie list using setMovies()
    setMovies(filteredMovies);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const movieCount = movies.length;

  if (isLoading) return <pre>LOADING...</pre>
  if (movieCount < 1) return <h2>There are no movies in the database.</h2>

  return (
    <>
      <h1 className={styles.visuallyHidden}>Vidly movie database</h1>
      <div className={styles.headerContainer}>
        <h2>Showing movie{movieCount > 1 ? 's' : ''} on this page ({movieCount})</h2>
        <Pagination
          totalPagesAvailable={totalPageCount}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
      <main>
        <table className="table table-striped">
          <thead>
          <tr>
            <th />
            <th>Title</th>
            <th>Genre</th>
            <th>Director</th>
            <th>IMDb Score</th>
            <th />
          </tr>
          </thead>
          <MovieList
            movies={movies}
            handleDelete={handleDelete}
          />
        </table>
      </main>
    </>
  )
}

export default Movies;
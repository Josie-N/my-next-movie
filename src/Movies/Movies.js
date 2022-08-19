import React, { useEffect, useState } from "react";
import MovieList from "../MovieList";
import Pagination from "../Pagination/Pagination";
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
      <h1 className={styles.visuallyHidden}>Vidly movie search database</h1>
      <a href="/">
        <h2 className='d-inline pr-5'>Vidly</h2>
      </a>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Showing movie{movieCount > 1 ? 's' : ''} on this page ({movieCount})</h3>
        <Pagination
          totalPageCount={totalPageCount}
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
            <th className={styles.tableHeader}>IMDb Score</th>
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
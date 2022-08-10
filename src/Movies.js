import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";

function Movies () {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
      fetch('https://k2maan-moviehut.herokuapp.com/api/movies?limit=10')
        .then(response => response.json())
        .then(json => setMovies(json.data))
        .catch(error => {
          console.error(error);
        });

      setLoading(false)
    }, []
  );

  const handleDelete = (movies, movie) => {
    const filteredMovies = movies.filter(m => m._id !== movie._id);

    // We update the initial movie list using setMovies()
    setMovies(filteredMovies);
  }

  const visuallyHidden = {
    position: 'absolute',
    left: -10000,
    top: 'auto',
    width: 1,
    height: 1,
    overflow: 'hidden'
  }

  const movieCount = movies.length;

  if (isLoading) return <pre>LOADING...</pre>
  if (movieCount < 1) return <h2>There are no movies in the database.</h2>

  return (
    <>
      <h1 style={visuallyHidden}>Vidly movie database</h1>
      <h2>Showing {movieCount} movie{movieCount > 1 ? 's' : ''} in the database.</h2>
      <main>
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Director</th>
            <th scope="col">imdb Rating</th>
            <th scope="col" />
          </tr>
          </thead>
          <MovieList movies={movies} handleDelete={handleDelete} />
        </table>
      </main>
    </>
  )
}

export default Movies;
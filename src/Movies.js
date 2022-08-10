import React, { useEffect, useState } from "react";

function Movies () {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
      fetch('https://k2maan-moviehut.herokuapp.com/api/movies?limit=10')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => {
          console.error(error);
        });
      
      setLoading(false)
    }, []
  );

  const { data: movieData } = data;

  const handleDelete = (movieData, movie) => {
    const filteredMovie = movieData.filter(m => m._id !== movie._id);
    // We override the initial movie list using setData()
    setData(filteredMovie);
  }

  const visuallyHidden = {
    position: 'absolute',
    left: -10000,
    top: 'auto',
    width: 1,
    height: 1,
    overflow: 'hidden'
  }

  const movieCount = movieData && movieData.length;

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
          <MovieList movieData={movieData} handleDelete={handleDelete} />
        </table>
      </main>
    </>
  )
}


function MovieList ({ movieData = [], handleDelete }) {

  return (
    <tbody>
    {movieData.map(movie => {
      return (
        <tr key={movie['_id']}>
          <td>{movie.name}</td>
          <td>{movie.genre}</td>
          <td>{movie.director}</td>
          <td>{movie.imdbRating}</td>
          <td>
            <button type="button" className="btn btn-danger btn-sm"
              // Lift up the state back to the parent component
                    onClick={() => handleDelete(movieData, movie)}>
              Delete
            </button>
          </td>
        </tr>
      )
    })}
    </tbody>
  )
}

export default Movies;
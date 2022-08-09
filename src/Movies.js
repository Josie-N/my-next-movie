import React, { useEffect, useState } from "react";
import { getMovies } from "./services/fakeMovieService";

function Movies () {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
      setData(getMovies())
      setLoading(false)
    }, []
  );

  const handleDelete = (data, movie) => {
    // Filter movie using filter method
    const filteredMovie = data.filter(m => m._id !== movie._id);

    // We override the initial list value using setData()
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

  const movieCount = data.length;

  if (movieCount < 1) return <h2>There are no movies in the database.</h2>
  if (isLoading) return <pre>LOADING...</pre>

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
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col" />
          </tr>
          </thead>
          <MovieList movieData={data} handleDelete={handleDelete} />
        </table>
      </main>
    </>
  )
}

function MovieList ({ movieData, handleDelete }) {

  return (
    <tbody>
    {movieData.map(movie => {
      return (
        <tr key={movie['_id']}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <button type="button" className="btn btn-danger btn-sm"
              // Lift up the state back to the parent component
                    onClick={() => handleDelete(movieData, movie)}>Delete
            </button>
          </td>
        </tr>
      )
    })}
    </tbody>
  )
}

export default Movies;
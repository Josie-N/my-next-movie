import React, { useEffect, useState } from "react";
import { getMovies } from "./services/fakeMovieService";

function Movies () {
  const [data, setData] = useState([]);

  useEffect(() => {
      setData(getMovies())
    }, []
  );

  // Don't forget: Add loading state
  // Suggestion: add pagination
  // Suggestion: use a real api instead

  const visuallyHidden = {
    position: 'absolute',
    left: -10000,
    top: 'auto',
    width: 1,
    height: 1,
    overflow: 'hidden'
  }

  if (data.length < 1) return <h2>There are no movies in the database.</h2>


  return (
    <>
      <h1 style={visuallyHidden}>Vidly movie database</h1>
      <h2>Showing {data.length} movie{data.length > 1 ? 's' : ''} in the database.</h2>
      <main>
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col"><strong>Title</strong></th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <MovieList movieData={data} />
        </table>
      </main>
    </>
  )
}


function MovieList (props) {

  const handleDelete = () => console.log('handleDelete triggered');

  return (
    <tbody>
    {props.movieData.map(movie => {
      return (
        <tr key={movie['_id']}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </tr>
      );
    })
    }
    </tbody>
  )
}

export default Movies;
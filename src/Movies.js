import React, { useEffect, useState } from "react";
import { getMovies } from "./services/fakeMovieService";

function Movies () {
  const [data, setData] = useState([]);

  useEffect(() => {
      setData(getMovies())
    }, []
  );

  return (
    <>
      {<h2>Showing {data.length} movie{data.length === 1 ? '' : 's'} in the database.</h2>}
      {!data.length && <h2>There are no movies in the database</h2>}
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
    </>
  )
}


function MovieList (props) {

  const handleDelete = () => console.log('handleDelete triggered');

  return (
    <tbody>
    {props.movieData.map(movie => {
      return (
        <tr>
          <td key={movie['_id']}>{movie.title}</td>
          <td key={movie.genre['_id']}>{movie.genre.name}</td>
          <td key={movie['_id']}>{movie.numberInStock}</td>
          <td key={movie['_id']}>{movie.dailyRentalRate}</td>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </tr>
      );
    })
    }
    </tbody>
  )
}

export default Movies;
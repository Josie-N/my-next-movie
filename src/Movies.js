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
      <table>
        <tbody>
        <MovieList movieData={data} />
        </tbody>
      </table>
    </>
  )

}


function MovieList (props) {

  const handleDelete = () => console.log('handleDelete triggered');

  return (
    <>
      {props.movieData.map(movie => {
        return (
          <tr>
            <th key={movie['_id']}>{movie.title}</th>
            <th key={movie.genre['_id']}>{movie.genre.name}</th>
            <th key={movie['_id']}>{movie.numberInStock}</th>
            <th key={movie['_id']}>{movie.dailyRentalRate}</th>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </tr>
        );
      })
      }
    </>
  )
}

export default Movies;
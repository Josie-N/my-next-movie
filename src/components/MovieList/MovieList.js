import React from "react";
import Like from "../Like/Like";

function MovieList ({ movies, handleDelete }) {

  return (
    <>
      {movies.map(movie => {
        const { _id, name, genre, director, imdbRating } = movie;
        const title = name.replace(/The /gm, '');

        return (
          <tr key={_id}>
            <Like />
            <td>
              <h4>{title}</h4>
            </td>
            <td>{genre}</td>
            <td>{director}</td>
            <td>{imdbRating}</td>
            <td>
              <button type="button" className="btn btn-danger btn-sm"
                // Lift up the state back to the parent component
                      onClick={() => handleDelete(movies, movie)}>
                Delete
              </button>
            </td>
          </tr>
        )
      })}
    </>
  )
}

export default MovieList;

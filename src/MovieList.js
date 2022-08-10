import React from "react";

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

export default MovieList;
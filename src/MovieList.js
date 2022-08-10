import React from "react";

function MovieList ({ movies, handleDelete }) {
  
  return (
    <tbody>
    {movies.map(movie => {
      const { _id, name, genre, director, imdbRating } = movie;

      return (
        <tr key={_id}>
          <td>{name}</td>
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
    </tbody>
  )
}

export default MovieList;
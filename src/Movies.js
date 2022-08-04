import React, { Component } from "react";
import { movies } from "./services/fakeMovieService";

// console.log(movies, 'movies are in Movies component');

class Movies extends Component {

  handleDelete = () => console.log()

  render() {
    return (
      <>
        {!movies.length && <h2>There are no movies in the database</h2>}
        {movies.length === 1 ? <h2>Showing {movies.length} movie in the database.</h2> :
          <h2>Showing {movies.length} movies in the database.</h2>}
        <table>
          <tbody>
          <MovieList />
          </tbody>
        </table>
      </>
    )
  }
}


function MovieList() {
  const listItems = movies.map(movie => <tr>
    <th key={movie['_id']}>{movie.title}</th>
    <th key={movie.genre['_id']}>{movie.genre.name}</th>
    <th key={movie['_id']}>{movie.numberInStock}</th>
    <th key={movie['_id']}>{movie.dailyRentalRate}</th>
    {/*<button type="button" class="btn btn-danger" onClick={this.handleDelete}>Delete</button>*/}
  </tr>);

  return (
    <>
      {listItems}
    </>
  )
}

export default Movies;
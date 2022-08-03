import React, {Component} from "react";
import {movies} from "./services/fakeMovieService";

// console.log(movies, 'movies are in Movies component');


class Movies extends Component {

  render() {
    // const [movie1, movie2] = movies;
    // console.log(movie2, 'movie');
    return (
      <>
        <h2>Showing {movies.length} movies in the database.</h2>
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
    {/*<th><Button /></th>*/}
  </tr>);

  return (
    <>
      {listItems}
    </>
  )
}

export default Movies;
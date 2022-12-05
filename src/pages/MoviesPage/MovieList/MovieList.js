import React from 'react';
import styles from "../../MoviesPage/MoviesPage.module.css";
import PropTypes from "prop-types";

import MovieCard from "../../../components/MovieCard/MovieCard";
import PaginationNumberScreenReader
  from "../../../components/PaginationNumberScreenReader/PaginationNumberScreenReader";
import PaginationNumber from "../../../components/PaginationNumber/PaginationNumber";

const MovieList = ({ movies, numberOfMoviesPerPage }) => {
  return (
    <div className={styles.movieCardContainer} aria-live="polite">
      {movies && movies.map((movie, index) => {

        // Move all of these calcs to calculatePagination function
        const quotient = index / numberOfMoviesPerPage;
        const pageNumber = Math.floor(quotient) + 1;

        const divisionRemainder = index % numberOfMoviesPerPage;

        // Output: 4, 9, 14, 19, ...
        const indexOfLastCardOnEachPage = (numberOfMoviesPerPage - 1);
        const showPageNumberOnLastCard = divisionRemainder === indexOfLastCardOnEachPage;

        // Output: 0, 5, 10, 15, ...
        const indexOfFirstCardOnEachPage = (numberOfMoviesPerPage - 5);
        const showPageNumberOnFirstCard = divisionRemainder === indexOfFirstCardOnEachPage

        return (
          <>
            <PaginationNumberScreenReader
              pageNumber={pageNumber}
              showPageNumberOnFirstCard={showPageNumberOnFirstCard}
            />
            <MovieCard key={movie._id}
                       movie={movie}
            />
            <PaginationNumber
              pageNumber={pageNumber}
              showPageNumberOnFirstCard={showPageNumberOnFirstCard}
              showPageNumberOnLastCard={showPageNumberOnLastCard}
            />
          </>
        );
      })}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  numberOfMoviesPerPage: PropTypes.number.isRequired,
};

export default MovieList;

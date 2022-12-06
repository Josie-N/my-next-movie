import React from 'react';
import styles from "../../MoviesPage/MoviesPage.module.css";
import PropTypes from "prop-types";

import { getPageFirstCard, getPageLastCard, getPageNumber } from "./utils/calculatePagination";

import MovieCard from "../MovieCard/MovieCard";
import PaginationNumberScreenReader
  from "../../../components/PaginationNumberScreenReader/PaginationNumberScreenReader";
import PaginationNumber from "../../../components/PaginationNumber/PaginationNumber";


const MovieList = ({ movies, numberOfMoviesPerPage }) => {
  return (
    <div className={styles.movieCardContainer} aria-live="polite">
      {movies && movies.map((movie, movieCardIndex) => {

        const pageNumber = getPageNumber(movieCardIndex, numberOfMoviesPerPage);
        const showPageNumberOnFirstCard = getPageFirstCard(movieCardIndex, numberOfMoviesPerPage);
        const showPageNumberOnLastCard = getPageLastCard(movieCardIndex, numberOfMoviesPerPage);

        return (
          <>
            <PaginationNumberScreenReader
              pageNumber={pageNumber}
              shouldBeDisplayed={showPageNumberOnFirstCard}
            />
            <MovieCard key={movie._id}
                       movie={movie}
            />
            <PaginationNumber
              pageNumber={pageNumber}
              shouldBeDisplayed={showPageNumberOnLastCard}
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

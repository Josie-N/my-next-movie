import React from 'react';
import styles from "../MovieListRecommended.module.css";
import PropTypes from "prop-types";

import { getPageFirstCard, getPageLastCard, getPageNumber } from "./utils/calculatePagination";

import MovieCard from "../MovieCard/MovieCard";
import PaginationNumberScreenReader from "../PaginationNumberScreenReader/PaginationNumberScreenReader";
import PaginationNumber from "../PaginationNumber/PaginationNumber";


const MovieList = ({ movies, numberOfMoviesPerPage, handleButtonAdd, handleButtonRemove }) => {

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
              handleButtonAdd={handleButtonAdd}
              handleButtonRemove={handleButtonRemove}
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

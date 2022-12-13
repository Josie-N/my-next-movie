import React from 'react';
import styles from "../MovieListRecommended/MovieListRecommended.module.css";
import PropTypes from "prop-types";

import { getPageFirstCard, getPageLastCard, getPageNumber } from "./utils/calculatePagination";

import MovieCard from "../MovieCard/MovieCard";
import PaginationNumberScreenReader from "../PaginationNumberScreenReader/PaginationNumberScreenReader";
import PaginationNumber from "../PaginationNumber/PaginationNumber";


const MovieList = ({ movies, numberOfMoviesPerPage, handleMoveToAddedList, handleMoveToRemovedList }) => {

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
              // key={movie._id}
            />
            <MovieCard
              movie={movie}
              handleMoveToAddedList={handleMoveToAddedList}
              handleMoveToRemovedList={handleMoveToRemovedList}
              // key={movie._id}
            />
            <PaginationNumber
              pageNumber={pageNumber}
              shouldBeDisplayed={showPageNumberOnLastCard}
              // key={movie._id}
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

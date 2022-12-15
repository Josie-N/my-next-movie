import React from 'react';
import styles from "./MovieList.module.css";
import PropTypes from "prop-types";

import { numberOfMoviesPerPage } from "../../../constants/constants";
import { getPageFirstCard, getPageLastCard, getPageNumber } from "./utils/calculatePagination";

import MovieCard from "../MovieCard/MovieCard";
import PaginationNumberScreenReader from "../PaginationNumberScreenReader/PaginationNumberScreenReader";
import PaginationNumber from "../PaginationNumber/PaginationNumber";


const MovieList = ({ movies, handleMoveToAddedList, handleMoveToRemovedList }) => {

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
  handleMoveToAddedList: PropTypes.func,
  handleMoveToRemovedList: PropTypes.func,
};

export default MovieList;

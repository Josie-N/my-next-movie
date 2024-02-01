import React, {useRef, useState} from 'react';

import {numberOfMoviesPerPage} from "../../../constants/constants";
import {Movies} from "../../../types/Movies";
import {getPageFirstCard, getPageLastCard, getPageNumber} from "./utils/calculatePagination";

import MovieCard from "../MovieCard/MovieCard";
import PaginationNumberScreenReader from "../PaginationNumberScreenReader/PaginationNumberScreenReader";
import PaginationNumber from "../PaginationNumber/PaginationNumber";
import {MovieCardContent} from '../MovieCardContent/MovieCardContent';

type MovieListProps = {
  movies: Movies,
  handleMoveToAddedList?: (_id: string, event: React.MouseEvent<HTMLButtonElement>) => void,
  handleMoveToRemovedList?: (_id: string, event: React.MouseEvent<HTMLButtonElement>) => void,
}

const MovieList = ({movies, handleMoveToAddedList, handleMoveToRemovedList}: MovieListProps) => {
  return (
    <div aria-live="polite">
      {movies.data.map((movie, movieCardIndex) => {
        const pageNumber = getPageNumber(movieCardIndex, numberOfMoviesPerPage);
        const showPageNumberOnFirstCard = getPageFirstCard(movieCardIndex, numberOfMoviesPerPage);
        const showPageNumberOnLastCard = getPageLastCard(movieCardIndex, numberOfMoviesPerPage);

        return (
          <React.Fragment key={movieCardIndex}>
            <PaginationNumberScreenReader
              pageNumber={pageNumber}
              shouldBeDisplayed={showPageNumberOnFirstCard}
            />
            <MovieCard
              movie={movie}
              canBeCollapsed
              hasPrimaryActionButtons
              hasCardShadow
              handleMoveToAddedList={handleMoveToAddedList}
              handleMoveToRemovedList={handleMoveToRemovedList}
              dataTestID="cy-movie-card"
              movieCardId={`card-index-${movieCardIndex}`}
            >
              <MovieCardContent movie={movie}/>
            </MovieCard>
            <PaginationNumber
              pageNumber={pageNumber}
              shouldBeDisplayed={showPageNumberOnLastCard}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default MovieList;

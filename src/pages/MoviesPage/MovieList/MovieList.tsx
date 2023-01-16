import React from 'react';
import styles from "./MovieList.module.css";

import {numberOfMoviesPerPage} from "../../../constants/constants";
import {getPageFirstCard, getPageLastCard, getPageNumber} from "./utils/calculatePagination";

import MovieCard from "../MovieCard/MovieCard";
import PaginationNumberScreenReader from "../PaginationNumberScreenReader/PaginationNumberScreenReader";
import PaginationNumber from "../PaginationNumber/PaginationNumber";
import {Movies} from "../../../types/Movies";

type Props = {
    movies: Movies,
    handleMoveToAddedList?: (_id: string, event: React.SyntheticEvent<HTMLButtonElement>) => void,
    handleMoveToRemovedList?: (_id: string, event: React.SyntheticEvent<HTMLButtonElement>) => void,
}

const MovieList = ({movies, handleMoveToAddedList, handleMoveToRemovedList}: Props) => {
    return (
        <div className={styles.movieCardContainer} aria-live="polite">
            {movies.data.map((movie, movieCardIndex) => {

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

export default MovieList;

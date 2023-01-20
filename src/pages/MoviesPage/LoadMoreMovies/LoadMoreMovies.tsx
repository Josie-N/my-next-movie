import React from 'react';

import styles from "../LoadMoreMovies/LoadMoreMovies.module.css";

import {ButtonLabel, Emoji, numberOfMoviesPerPage} from "../../../constants/constants";
import Button from "../../../components/generic/Button/Button";
import useWatchlistName from "../../../hooks/useWatchlistName";
import {Movies} from "../../../types/Movies";

type Props = {
    movies: Movies,
    handleLoadMoreMovies: () => void,
    hasNextPage: boolean | undefined,
    moviesToPaginate?: number
}

const LoadMoreMovies = ({movies, handleLoadMoreMovies, hasNextPage, moviesToPaginate}: Props) => {
    const {watchlistNameRecommended} = useWatchlistName();

    if (movies?.data.length < numberOfMoviesPerPage) {
        return null;
    }

    return (
        <div className={styles.showMoreMovies}>
            {
                hasNextPage ?
                    <Button ariaLabel={`Show more movies (${moviesToPaginate})`}
                            hasIcon
                            icon={Emoji.PointingDown}
                            type="button"
                            handleButtonClick={handleLoadMoreMovies}
                    >
                        {watchlistNameRecommended ?
                            <span>{ButtonLabel.ShowMore} ({moviesToPaginate})</span>
                            :
                            <span>{ButtonLabel.ShowMore}</span>
                        }
                    </Button>
                    :
                    <h4>No more movies to load.</h4>
            }
        </div>
    );
};

export default LoadMoreMovies;

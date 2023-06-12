import React from 'react';
import styles from "../LoadMoreMovies/LoadMoreMovies.module.css";

import { Movies } from "../../../types/Movies";
import { ButtonLabel, Emoji, numberOfMoviesPerPage } from "../../../constants/constants";
import useWatchlistName from "../../../hooks/useWatchlistName";
import { Heading } from 'src/components/generic/Heading/Heading';
import Button from "../../../components/generic/Button/Button";

type Props = {
  movies: Movies,
  handleLoadMoreMovies: () => void,
  hasNextPage: boolean | undefined,
  moviesToPaginate?: number
}

const LoadMoreMovies = ({ movies, handleLoadMoreMovies, hasNextPage, moviesToPaginate }: Props) => {
  const { watchlistNameRecommended } = useWatchlistName();

  if (movies?.data.length < numberOfMoviesPerPage) {
    return null;
  }

  return (
    <>
      {hasNextPage ?
        <div className={styles.showMoreMovies}>
          <Button variant="contained"
                  ariaLabel={`Show more movies (${moviesToPaginate})`}
                  hasIcon
                  icon={Emoji.PointingDown}
                  hasLoadingIcon
                  type="button"
                  handleButtonClick={handleLoadMoreMovies}
          >
            {watchlistNameRecommended ?
              <span>{ButtonLabel.ShowMore} ({moviesToPaginate})</span>
              :
              <span>{ButtonLabel.ShowMore}</span>
            }
          </Button>
        </div>
        :
        watchlistNameRecommended ?
          <div className={styles.showMoreMovies}>
            <Heading level="h4">No more movies to load.</Heading>
          </div>
          : null
      }
    </>
  );
};

export default LoadMoreMovies;

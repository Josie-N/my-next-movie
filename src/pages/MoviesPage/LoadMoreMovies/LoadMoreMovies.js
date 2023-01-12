import React from 'react';

import styles from "../LoadMoreMovies/LoadMoreMovies.module.css";
import { ButtonLabel, Emoji, numberOfMoviesPerPage } from "../../../constants/constants";
import Button from "../../../components/generic/Button/Button";

const LoadMoreMovies = ({ handleLoadMoreMovies, hasNextPage, movies }) => {

  if (movies?.data.length < numberOfMoviesPerPage) {
    return null;
  }

  return (
    <div className={styles.showMoreMovies}>
      {
        hasNextPage ?
          <Button ariaLabel="Show more movies"
                  hasIcon
                  icon={Emoji.PointingDown}
                  type="button"
                  handleButtonClick={handleLoadMoreMovies}
          >
            <span>{ButtonLabel.ShowMore}</span>
          </Button>
          :
          <h4>No more movies to load.</h4>
      }
    </div>
  );
};

export default LoadMoreMovies;
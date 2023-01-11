import React from 'react';

import styles from "../LoadMoreMovies/LoadMoreMovies.module.css";
import { ButtonLabel, Emoji } from "../../../constants/constants";

import Button from "../../../components/generic/Button/Button";
import useListRecommendedQuery from "../MovieListRecommended/hooks/useQueryListRecommended";

const LoadMoreMovies = () => {
  const { hasNextPage, fetchNextPage } = useListRecommendedQuery();

  return (
    <div className={styles.showMoreMovies}>
      {
        hasNextPage ?
          <Button ariaLabel="Show more movies"
                  hasIcon
                  icon={Emoji.PointingDown}
                  type="button"
                  handleButtonClick={() => fetchNextPage()}
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
import React from 'react';
import PropTypes from "prop-types";

import styles from "../LoadMoreMovies/LoadMoreMovies.module.css";
import Button from "../../../components/generic/Button/Button";

const LoadMoreMovies = ({ currentPage, totalPageCount, handleLoadMoreMovies }) => {
  return (
    <div className={styles.showMoreMovies}>
      {
        (currentPage === totalPageCount) ?
          <h4>No more movies to load.</h4>
          :
          <Button ariaLabel="Show more movies"
                  hasIcon
                  icon="👇"
                  type="button"
                  handleButtonClick={handleLoadMoreMovies}
          >
            <span>SHOW MORE</span>
          </Button>
      }
    </div>
  );
};

LoadMoreMovies.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPageCount: PropTypes.number.isRequired,
  handleLoadMoreMovies: PropTypes.func.isRequired
};

export default LoadMoreMovies;
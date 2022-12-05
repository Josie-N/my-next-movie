import React from 'react';
import styles from "../MoviesPage.module.css";
import Button from "../../../components/generic/Button/Button";
import PropTypes from "prop-types";

const LoadMoreMovies = ({ currentPage, totalPageCount, loadMoreMovies }) => {
  return (
    <div className={styles.showMoreMovies}>
      {
        (currentPage === totalPageCount) ?
          <h4>No more movies to load.</h4>
          :
          <Button ariaLabel="Show more movies" hasIcon icon="👇" type="button"
                  handleButtonClick={loadMoreMovies}>
            <span>SHOW MORE</span>
          </Button>
      }
    </div>
  );
};

LoadMoreMovies.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPageCount: PropTypes.number.isRequired,
  loadMoreMovies: PropTypes.func.isRequired
};

export default LoadMoreMovies;
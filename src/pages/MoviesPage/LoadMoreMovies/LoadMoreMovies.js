import React from 'react';
import PropTypes from "prop-types";

import { useStore } from "../../../store/store";

import styles from "../LoadMoreMovies/LoadMoreMovies.module.css";
import Button from "../../../components/generic/Button/Button";

const LoadMoreMovies = ({ handleLoadMoreMovies }) => {
  const currentPage = useStore(state => state.currentPage);
  const totalPageCount = useStore(state => state.totalPageCount);

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
  handleLoadMoreMovies: PropTypes.func.isRequired
};

export default LoadMoreMovies;
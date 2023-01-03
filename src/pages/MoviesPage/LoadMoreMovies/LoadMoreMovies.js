import React from 'react';
import PropTypes from "prop-types";

import styles from "../LoadMoreMovies/LoadMoreMovies.module.css";
import { useStore } from "../../../store/store";
import { ButtonLabel, Emoji } from "../../../constants/constants";

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
          <Button ariaLabel={`Show more movies, ${totalPageCount - currentPage} pages left`}
                  hasIcon
                  icon={Emoji.PointingDown}
                  type="button"
                  handleButtonClick={handleLoadMoreMovies}
          >
            <span>{ButtonLabel.ShowMore} ({totalPageCount - currentPage})</span>
          </Button>
      }
    </div>
  );
};

LoadMoreMovies.propTypes = {
  handleLoadMoreMovies: PropTypes.func.isRequired
};

export default LoadMoreMovies;
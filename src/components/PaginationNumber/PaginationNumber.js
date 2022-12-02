import React from 'react';
import styles from "../PaginationNumber/PaginationNumber.module.css";
import PropTypes from "prop-types";

function PaginationNumber ({ showPageNumberOnLastCard, pageNumber }) {
  return (
    <>
      {
        showPageNumberOnLastCard &&
        <span aria-hidden className={styles.pageLandmark}>
          {pageNumber}
        </span>
      }
    </>
  );
}

PaginationNumber.propTypes = {
  pageNumber: PropTypes.number,
  showPageNumberOnLastCard: PropTypes.bool
};

export default PaginationNumber;
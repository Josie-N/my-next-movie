import React from 'react';
import styles from "../PaginationNumber/PaginationNumber.module.css";
import PropTypes from "prop-types";

function PaginationNumber ({ shouldBeDisplayed, pageNumber }) {
  return (
    <>
      {
        shouldBeDisplayed &&
        <span aria-hidden className={styles.pageLandmark}>
          {pageNumber}
        </span>
      }
    </>
  );
}

PaginationNumber.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  shouldBeDisplayed: PropTypes.bool.isRequired
};

export default PaginationNumber;
import React from 'react';
import styles from "./PaginationNumber.module.css";

interface PaginationNumberProps {
  shouldBeDisplayed: boolean,
  pageNumber: number
}

function PaginationNumber({shouldBeDisplayed, pageNumber}: PaginationNumberProps): JSX.Element | null {
  return (
    // TODO: Add <nav aria-label="pagination">
    <>
      {shouldBeDisplayed &&
          <span aria-hidden className={styles.pageLandmark} data-testid="pagination-number">
            {pageNumber}
          </span>
      }
    </>
  );
}

export default PaginationNumber;

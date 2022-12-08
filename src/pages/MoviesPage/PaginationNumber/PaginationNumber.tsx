import React from 'react';
import styles from "./PaginationNumber.module.css";

interface PaginationNumberProps {
  shouldBeDisplayed: boolean,
  pageNumber: number
}

function PaginationNumber ({ shouldBeDisplayed, pageNumber }: PaginationNumberProps): JSX.Element | null {
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

export default PaginationNumber;
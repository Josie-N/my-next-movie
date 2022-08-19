import React from 'react';
import _ from 'lodash';
import classNames from "classnames";

function Pagination ({ totalPageCount, onPageChange, currentPage }) {
  if (totalPageCount === 1) return null;

  // Pagination format: N-2 | N-1 | current page = N | N+1 | N+2
  // Pagination example: 5 | 6 | current page = 7 | 8 | 9

  // Calculate: firstVisiblePageNumber = the value of N-2 (type: number)
  const firstVisiblePageNumber = Math.max(currentPage - 2, 1);

  // Condition to initially show only the first two-page numbers (1 and 2).
  // Initial format: current page = N | N+1
  const numberOfPagesToShowOnRight = currentPage > 2 ? 2 : 1;

  // Calculate: lastVisiblePageNumber = the value of N+2 (type: number)
  const lastVisiblePageNumber = Math.min(currentPage + numberOfPagesToShowOnRight, totalPageCount);

  // _.range() creates an array of numbers
  // Example: 50 (integer) is converted to: [1, 2, 3, ... , 49]
  let pageNumberRange = _.range(firstVisiblePageNumber, lastVisiblePageNumber + 1);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Pagination Navigation"
        className="d-flex align-items-baseline"
      >
        <ul className="pagination justify-content-end">
          {pageNumberRange.map(pageNumber => {
            const pageIsActive = pageNumber === currentPage;
            const activePageNumberStyling = classNames('page-item', { 'active': pageIsActive });

            return (
              <li key={pageNumber} className={activePageNumberStyling}>
                <a
                  href="#/"
                  aria-current={pageIsActive}
                  aria-label={`Go to Page ${pageNumber}`}
                  className="page-link"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
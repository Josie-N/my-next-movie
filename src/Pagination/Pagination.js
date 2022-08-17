import React from 'react';
import _ from 'lodash';
import classNames from "classnames";

function Pagination (
  {
    totalPagesAvailable,
    onPageChange,
    currentPage
  }) {
  // _.range() creates an array of numbers
  // Example: 50 (integer) is converted to: [1, 2, 3, ... , 50] (array)
  let pages = _.range(1, totalPagesAvailable + 1);

  if (totalPagesAvailable === 1) return null;

  if (totalPagesAvailable > 3) {
    pages = pages.slice(0, 3)
  }

  return (
    <>
      <nav
        role="navigation"
        aria-label="Pagination Navigation"
        className="d-flex align-items-baseline"
      >
        <ul className="pagination justify-content-end">
          {pages.map(pageNumber => {
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
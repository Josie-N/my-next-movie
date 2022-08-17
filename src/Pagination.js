import React, { useState } from 'react';
import _ from 'lodash';
import classNames from "classnames";

function Pagination ({ totalPagesAvailable }) {

  const [currentPage, setCurrentPage] = useState(1);

  if (totalPagesAvailable === 1) return null;

  // _.range() creates an array of numbers
  // Result: 50 (integer) is converted to: [1, 2, 3, ... , 50] (array with no 0 index)
  let pages = _.range(1, totalPagesAvailable + 1);

  if (totalPagesAvailable > 3) {
    pages = pages.slice(0, 3)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <nav
        role="navigation"
        aria-label="Pagination Navigation"
        className="d-flex align-items-baseline"
      >
        {pages.map(pageNumber => {
          const pageIsActive = pageNumber === currentPage;
          const activePageNumberStyling = classNames('page-item', { 'active': pageIsActive });

          return (
            <ul key={pageNumber} className="pagination">
              <li className={activePageNumberStyling}>
                <a aria-current={pageIsActive}
                   aria-label={`Go to Page ${pageNumber}`}
                   className="page-link"
                   onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            </ul>
          )
        })}
      </nav>
    </>
  );
}

export default Pagination;
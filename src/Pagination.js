import React from 'react';
import _ from 'lodash';

function Pagination ({ totalPagesAvailable }) {
  if (totalPagesAvailable === 1) return null;

  // _.range() creates an array of numbers
  // Result: 50 (integer) is converted to: [1, 2, 3, ... , 50] (array with no 0 index)
  const pages = _.range(1, totalPagesAvailable + 1);


  return (
    <>
      <nav role="navigation" aria-label="Pagination Navigation">
        {pages.map(pageNumber =>
          <ul key={pageNumber} className="pagination">
            {/*<li onClick={onPageChange} className={pageStatusClass}>*/}
            <li>
              <a className="page-link" aria-label={`Go to Page ${pageNumber}`}>{pageNumber}</a>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Pagination;
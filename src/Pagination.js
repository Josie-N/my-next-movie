import React from 'react';

function Pagination () {
  return (
    <>
      <nav role="navigation" aria-label="Pagination Navigation">
        <ul className="pagination">
          <li className="page-item active">
            <a className="page-link" href="#" aria-label="Go to Page 1" aria-current>1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Go to Page 2">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Go to Page 3">3</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
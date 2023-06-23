import React from 'react';

import { Heading } from 'src/components/generic/Heading/Heading';

interface PgNumScreenReaderProps {
  shouldBeDisplayed: boolean,
  pageNumber: number
}

const PaginationNumberScreenReader = ({ shouldBeDisplayed, pageNumber }: PgNumScreenReaderProps)
  : JSX.Element | null => {

  // So that screen readers don't announce Page 1 every time
  // a non-sighted user renders a movie list
  if(pageNumber === 1) return null;

  return (
    // TODO: Add <nav aria-label="pagination">
    <>
      {
        shouldBeDisplayed &&
        <Heading level="h3" hideTextVisually>Page {pageNumber}</Heading>
      }
    </>
  );
};

export default PaginationNumberScreenReader;

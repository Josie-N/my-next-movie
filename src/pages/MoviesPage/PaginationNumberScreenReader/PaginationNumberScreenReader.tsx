import React from 'react';

import { Heading } from 'src/components/generic/Heading/Heading';

interface PgNumScreenReaderProps {
  shouldBeDisplayed: boolean,
  pageNumber: number
}

const PaginationNumberScreenReader = ({ shouldBeDisplayed, pageNumber }: PgNumScreenReaderProps)
  : JSX.Element | null => {
  return (
    <>
      {
        shouldBeDisplayed &&
        <Heading level="h3" hideTextVisually>Page {pageNumber}</Heading>
      }
    </>
  );
};

export default PaginationNumberScreenReader;

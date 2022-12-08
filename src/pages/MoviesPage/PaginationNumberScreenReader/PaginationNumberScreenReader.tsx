import React from 'react';
import helperStyles from "../../../assets/stylesheets/helper.module.css";

interface PgNumScreenReaderProps {
    shouldBeDisplayed: boolean,
    pageNumber: number
}

const PaginationNumberScreenReader = ({shouldBeDisplayed, pageNumber}: PgNumScreenReaderProps)
    : JSX.Element | null => {
    return (
        <>
            {
                shouldBeDisplayed &&
              <h3 className={helperStyles.visuallyHidden}>
                Page {pageNumber}
              </h3>
            }
        </>
    );
};

export default PaginationNumberScreenReader;

import React from 'react';
import helperStyles from "../../../assets/stylesheets/helper.module.css";
import PropTypes from "prop-types";

const PaginationNumberScreenReader = ({ shouldBeDisplayed, pageNumber }) => {
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

PaginationNumberScreenReader.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  shouldBeDisplayed: PropTypes.bool.isRequired,
};

export default PaginationNumberScreenReader;
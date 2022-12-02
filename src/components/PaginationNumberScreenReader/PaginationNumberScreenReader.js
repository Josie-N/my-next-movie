import React from 'react';
import helperStyles from "../../assets/stylesheets/helper.module.css";
import PropTypes from "prop-types";

const PaginationNumberScreenReader = ({ showPageNumberOnFirstCard, pageNumber }) => {
  return (
    <>
      {
        showPageNumberOnFirstCard &&
        <h3 className={helperStyles.visuallyHidden}>
          Page {pageNumber}
        </h3>
      }
    </>
  );
};

PaginationNumberScreenReader.propTypes = {
  pageNumber: PropTypes.number,
  showPageNumberOnFirstCard: PropTypes.bool,
};

export default PaginationNumberScreenReader;
import React from 'react';
import styles from './Button.module.css';
import PropTypes from "prop-types";

function Button ({ type = 'button', handleButtonClick, children }) {
  return (
    <button onClick={handleButtonClick}
            type={type}
            className={styles.button}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  handleButtonClick: PropTypes.func,
  children: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'button'
};

export default Button;
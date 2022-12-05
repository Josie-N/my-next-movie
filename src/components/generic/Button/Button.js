import React from 'react';
import styles from './Button.module.css';
import PropTypes from "prop-types";

function Button ({ ariaLabel, hasIcon, icon, type = 'button', handleButtonClick, children }) {

  return (
    <button onClick={handleButtonClick}
            type={type}
            className={styles.button}
            aria-label={ariaLabel}
    >
      {hasIcon ? <span className={styles.buttonIcon}>{icon}</span> : ''}
      {children}
    </button>
  );
}

Button.propTypes = {
  hasIcon: PropTypes.bool,
  icon: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  handleButtonClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  type: 'button',
  hasIcon: false
};

export default Button;
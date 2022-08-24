import React from 'react';
import styles from './Button.module.css';

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

export default Button;
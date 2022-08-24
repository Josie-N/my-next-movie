import React from 'react';
import styles from "./ButtonGroup.module.css";

function ButtonGroup ({ children }) {

  return (
    <div className={styles.buttonGroup}>
      {children}
    </div>
  );
}

export default ButtonGroup;

import React from 'react';
import PropTypes from "prop-types";
import styles from "./ButtonGroup.module.css";

function ButtonGroup ({ children }) {
  return (
    <div className={styles.buttonGroup}>
      {children}
    </div>
  );
}

ButtonGroup.propTypes = {
  // node represents anything that can be rendered: numbers, strings, elements, or an array
  children: PropTypes.node.isRequired
};

export default ButtonGroup;

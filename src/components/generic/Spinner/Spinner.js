import React from "react";
import spinner from '../../../assets/images/spinner.svg'
import styles from './Spinner.module.css';

export default function Spinner () {
  return (
    <div className={styles.spinner}>
      <img className={styles.spinnerIcon}
           src={spinner}
           alt="Loading..."
      />
      <span>Loading…</span>
    </div>
  );
};

import React from "react";
import spinner from '../../../assets/images/spinner.svg'
import styles from './LoadingIndicator.module.css';

export default function LoadingIndicator(): JSX.Element {
    return (
        <div className={styles.spinner} aria-label="Content loading">
            <img className={styles.spinnerIcon}
                 src={spinner}
                 alt="Loading..."
            />
            <span>Loading…</span>
        </div>
    );
};

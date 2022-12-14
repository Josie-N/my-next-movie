import React from 'react';
import styles from "./ButtonGroup.module.css";

interface ButtonGroupProps {
    children: React.ReactNode;
}

function ButtonGroup({children}: ButtonGroupProps): JSX.Element {
    return (
        <div className={styles.buttonGroup}>
            {children}
        </div>
    );
}

export default ButtonGroup;

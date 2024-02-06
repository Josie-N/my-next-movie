import React from 'react';
import styles from "./ButtonGroup.module.css";

interface ButtonGroupProps {
    children: React.ReactNode;
}

// TO DO: Is ButtonGroup still necessary?
function ButtonGroup({children}: ButtonGroupProps): JSX.Element {
    return (
        <div>
            {children}
        </div>
    );
}

export default ButtonGroup;

import React from 'react';
import styles from "./ButtonGroup.module.css";

interface ButtonGroupProps {
    children: React.ReactNode;
}

// What exactly does ButtonGroup do?
// Create a group of buttons?
function ButtonGroup({children}: ButtonGroupProps): JSX.Element {

    // Maybe add a condition here if it's a primary button group or not?
    // if not, just add a different class name / style

    // I think we need to move this styling to ButtonGroupMovieCard instead of here
    // Why would a generic component like this have such specific styling?
    return (
        <div>
            {children}
        </div>
    );
}

export default ButtonGroup;

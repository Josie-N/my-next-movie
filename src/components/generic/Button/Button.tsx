import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    ariaLabel?: string,
    hasIcon?: boolean,
    icon: string,
    type: "button" | "submit" | "reset",
    handleButtonClick: React.MouseEventHandler,
    children: React.ReactNode
}

function Button({ariaLabel, hasIcon = false, icon, type = 'button', handleButtonClick, children}: ButtonProps) {

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

export default Button;

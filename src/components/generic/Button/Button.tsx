import React from 'react';
import classNames from "classnames/bind";

import styles from './Button.module.css';

interface ButtonProps {
  ariaLabel?: string,
  hasIcon?: boolean,
  icon?: string,
  type: "button" | "submit" | "reset",
  handleButtonClick: React.MouseEventHandler,
  variant: "base" | "outlined" | "contained",
  children: React.ReactNode
}

function Button({
                  ariaLabel,
                  hasIcon = false,
                  icon,
                  type = 'button',
                  handleButtonClick,
                  variant,
                  children
                }: ButtonProps) {

  const cn = classNames.bind(styles);

  const buttonClassNames = cn(
    { 'button': variant === 'base' },
    { 'button__outlined': variant === 'outlined' },
    { 'button__contained': variant === 'contained' },
  );

  return (
    <button onClick={handleButtonClick}
            type={type}
            className={buttonClassNames}
            aria-label={ariaLabel}
    >
      {hasIcon ? <span className={styles.buttonIcon}>{icon}</span> : ''}
      {children}
    </button>
  );
}

export default Button;

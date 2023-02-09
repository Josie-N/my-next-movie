import React from 'react';
import classNames from "classnames/bind";

import styles from './Button.module.css';
import { useStore } from "../../../store/store";
import getMovieListConfiguration from "../../../pages/MoviesPage/utils/movieListConfiguration";
import useQueryList from "../../../hooks/useQueryList";
import { Loader } from 'react-feather';

interface ButtonProps {
  ariaLabel?: string,
  hasIcon?: boolean,
  icon?: string,
  hasLoadingIcon?: boolean,
  type: "button" | "submit" | "reset",
  handleButtonClick: React.MouseEventHandler,
  variant: "base" | "outlined" | "contained",
  children: React.ReactNode
}

function Button({
                  ariaLabel,
                  hasIcon = false,
                  icon,
                  hasLoadingIcon = false,
                  type = 'button',
                  handleButtonClick,
                  variant,
                  children
                }: ButtonProps) {

  const movieListType = useStore(state => state.movieListType);
  const movieListConfig = getMovieListConfiguration(movieListType);
  const { isFetching } = useQueryList(movieListConfig);

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
      {hasLoadingIcon && isFetching ?
        <>
          LOADING
          <Loader className={styles.buttonLoadingIcon} strokeWidth={2.5} size={16} color="#1C2735" />
        </>
        :
        <>
          {hasIcon ? <span className={styles.buttonIcon}>{icon}</span> : null}
          {children}
        </>
      }
    </button>
  );
}

export default Button;

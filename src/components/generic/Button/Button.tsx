import React from 'react';
import classNames from "classnames/bind";
import {Loader} from 'react-feather';

import styles from './Button.module.css';
import {useStore} from "../../../store/store";
import getMovieListConfiguration from "../../../pages/MoviesPage/utils/movieListConfiguration";
import useQueryList from "../../../hooks/useQueryList";
import {ButtonLabel} from "../../../constants/constants";

interface ButtonEventHandlers {
  handleButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  handleButtonMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  handleButtonMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

interface ButtonAppearance {
  hasIcon?: boolean,
  icon?: string,
  hasLoadingIcon?: boolean,
  variant: "base" | "text" | "outlined" | "contained" | "contained-secondary",
}

interface ButtonProps extends ButtonEventHandlers, ButtonAppearance {
  ariaLabel?: string,
  type: "button" | "submit" | "reset",
  children: React.ReactNode,
  isButtonDisabled?: boolean
}

function Button({
                  ariaLabel,
                  hasIcon = false,
                  icon,
                  hasLoadingIcon = false,
                  type = 'button',
                  handleButtonClick,
                  handleButtonMouseEnter,
                  handleButtonMouseLeave,
                  variant,
                  children,
                  isButtonDisabled
                }: ButtonProps) {

  const movieListType = useStore(state => state.movieListType);
  const movieListConfig = getMovieListConfiguration(movieListType);
  const {isFetching} = useQueryList(movieListConfig);

  // TO DO: Move this to a separate file
  // TO DO: Need a storybook with examples of all the buttons
  const cn = classNames.bind(styles);
  const buttonClassNames = cn(
    {'button': variant === 'base'},
    {'button__text': variant === 'text'},
    {'button__outlined': variant === 'outlined'},
    {'button__contained': variant === 'contained'},
    {'button__contained-secondary': variant === 'contained-secondary'},
    {'button__disabled': isButtonDisabled}
  );

  return (
    <button onClick={handleButtonClick}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            type={type}
            className={buttonClassNames}
            aria-label={ariaLabel}
            disabled={isButtonDisabled}
    >
      {hasLoadingIcon && isFetching ?
        <>
          {ButtonLabel.Loading}
          <Loader className={styles.buttonLoadingIcon} strokeWidth={2.5} size={16} color="#1C2735"/>
        </>
        :
        <>
          {hasIcon ? <span className={styles.buttonIcon}>{icon}</span> : null}
          <span className={styles.test}>{children}</span>
        </>
      }
    </button>
  );
}

export default Button;

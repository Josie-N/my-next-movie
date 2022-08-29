import React, { useState } from 'react';
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";
import cn from "classnames";

import styles from "./MovieCard.module.css";


function MovieCard ({ movie }) {
  const { _id, name, releaseYear, genre, imdbRating, overview } = movie;

  const cardAlreadyCollapsed = JSON.parse(window.localStorage.getItem(_id));
  const cardCollapsedInitialState = cardAlreadyCollapsed ? cardAlreadyCollapsed : false;

  const [isCardCollapsed, setCardCollapse] = useState(cardCollapsedInitialState);
  const [isCardActionable, setCardActionable] = useState(false);

  const title = name.replace(/The /gm, '');

  const isMovieNew = releaseYear >= 2000;
  const movieCardShadowClassNames = cn(
    { [styles["movieCardShadow__new"]]: isMovieNew },
    { [styles["movieCardShadow__old"]]: !isMovieNew }
  );
  
  const handleMouseEnter = () => setCardActionable(true);

  const handleMouseLeave = () => setCardActionable(false);

  const handleCollapse = () => {
    localStorage.setItem(_id, JSON.stringify(!isCardCollapsed));
    setCardCollapse(!isCardCollapsed);
  }

  const handleButtonClick = (event) => event.stopPropagation();

  const buttonGroup = <>
    {isCardActionable ?
      <ButtonGroup>
        <Button handleButtonClick={handleButtonClick}>NO.</Button>
        <Button handleButtonClick={handleButtonClick}>YES!</Button>
      </ButtonGroup>
      : ''
    }
  </>

  if (isCardCollapsed) {
    return (
      <div
        tabIndex="0"
        className={styles.movieCard__collapsed}
        onClick={handleCollapse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h4 className={styles.movieTitle__collapsed}>{title}</h4>
      </div>
    )
  }

  return (
    <div
      tabIndex="0"
      className={styles.movieCard__open}
      onClick={handleCollapse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.movieCardInner}>
        <h4 className={styles.movieTitle__open}>{title}</h4>
        <p className={styles.movieDetails}>
          <span className={styles.movieYear}>{releaseYear} ∙ </span>
          <span>{genre}</span>
        </p>
        <p className={styles.movieDescription}>{overview}</p>
      </div>
      <p className={styles.movieRating}>{imdbRating}</p>
      {buttonGroup}
      <div className={movieCardShadowClassNames}></div>
    </div>
  );
}

export default MovieCard;

import React, { useState } from 'react';
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";

import styles from "./MovieCard.module.css";


function MovieCard ({ movie }) {
  const [isCardCollapsed, setCardCollapse] = useState(false);
  const [isCardActionable, setCardActionable] = useState(false);

  const { name, genre, director, imdbRating, overview } = movie;
  const title = name.replace(/The /gm, '');

  const handleMouseEnter = () => setCardActionable(true);

  const handleMouseLeave = () => setCardActionable(false);
  
  const handleCollapse = () => setCardCollapse(!isCardCollapsed);

  const handleButtonClick = (event) => {
    event.stopPropagation();
  }

  const buttonGroup = <>
    {isCardActionable ?
      <ButtonGroup>
        <Button handleButtonClick={handleButtonClick}>YES!</Button>
        <Button handleButtonClick={handleButtonClick}>NO.</Button>
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
    <>
      <div
        tabIndex="0"
        className={styles.movieCard__open}
        onClick={handleCollapse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.movieCardInner}>
          <h4 className={styles.movieTitle__open}>{title}</h4>
          <p className={styles.movieDetails}>{genre} ∙ {director}</p>
          <p className={styles.movieDescription}>{overview}</p>
        </div>
        <p className={styles.movieRating}>{imdbRating}</p>
        {buttonGroup}
        <div className={styles.movieCardShadow}></div>
      </div>
    </>
  );
}

export default MovieCard;

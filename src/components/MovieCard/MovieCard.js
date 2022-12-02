import React, { useState } from 'react';
import ButtonGroup from "../generic/ButtonGroup/ButtonGroup";
import Button from "../generic/Button/Button";

import styles from "./MovieCard.module.css";
import cn from "classnames";
import PropTypes from "prop-types";


function MovieCard ({ movie }) {
  const { _id, name, releaseYear, genre, imdbRating, overview } = movie;

  const imdbRatingInteger = Math.round(imdbRating * 10);
  const title = name.replace(/The /gm, '');

  // move to Homepage instead, because it's inside a map function
  // helper function in a different js file
  // 2 functions: 1. save to local storage
  //              2. get from local storage

  const cardAlreadyCollapsed = JSON.parse(window.localStorage.getItem(_id));
  // { '1234' : false,
  //    '5678' : true,
  //    '345345' : true,
  //  }
  // store only the expanded one, to reduce the amount of properties,reduce complexity
  // [ '234', '434534', '345345' ] everything is true, you check if the id exists in the array

  const cardCollapsedInitialState = cardAlreadyCollapsed ? cardAlreadyCollapsed : false;

  const [isCardCollapsed, setCardCollapse] = useState(cardCollapsedInitialState);
  const [isCardActionable, setCardActionable] = useState(false);

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

  const buttonGroup =
    <>
      {isCardActionable ?
        <ButtonGroup>
          <Button hasIcon icon="👎🏻" type="button" handleButtonClick={handleButtonClick}>
            <span>REMOVE</span>
          </Button>
          <Button hasIcon icon="👍" type="button" handleButtonClick={handleButtonClick}>
            <span>ADD</span>
          </Button>
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
      <p className={styles.movieRating}>{imdbRatingInteger}</p>
      {buttonGroup}
      <div className={movieCardShadowClassNames}></div>
    </div>
  );
}

MovieCard.propTypes = {
  // shape() takes an object and validates the types inside the object
  // movie prop is expected to have the following properties:
  movie: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      releaseYear: PropTypes.number,
      genre: PropTypes.string,
      imdbRating: PropTypes.number,
      overview: PropTypes.string
    }
  ).isRequired,
};

export default MovieCard;

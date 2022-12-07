import React, { useState } from 'react';
import PropTypes from "prop-types";
import cn from "classnames";

import useLocalStorage from "../../../hooks/useLocalStorage";
import { getImdbRatingInteger, getMovieTitle } from "./utils/helper";
import styles from "./MovieCard.module.css";

import ButtonGroup from "../../../components/generic/ButtonGroup/ButtonGroup";
import Button from "../../../components/generic/Button/Button";

function MovieCard ({ movie }) {
  const { _id, name, releaseYear, genre, imdbRating, overview } = movie;
  const imdbRatingInteger = getImdbRatingInteger(imdbRating);
  const movieTitle = getMovieTitle(name);

  const [isCardCollapsed, setCardCollapse] = useLocalStorage(false, _id);
  const [isCardActionable, setCardActionable] = useState(false);

  const isMovieNew = releaseYear >= 2000;
  const movieCardShadowClassNames = cn(
    { [styles["movieCardShadow__new"]]: isMovieNew },
    { [styles["movieCardShadow__old"]]: !isMovieNew }
  );

  const handleMouseEnter = () => setCardActionable(true);
  const handleMouseLeave = () => setCardActionable(false);
  const handleButtonClick = (event) => event.stopPropagation();
  const handleCollapse = () => {
    setCardCollapse(!isCardCollapsed);
  }

  if (isCardCollapsed) {
    return (
      <div
        tabIndex="0"
        className={styles.movieCard__collapsed}
        onClick={handleCollapse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h4 className={styles.movieTitle__collapsed}>{movieTitle}</h4>
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
        <h4 className={styles.movieTitle__open}>{movieTitle}</h4>
        <p className={styles.movieDetails}>
          <span className={styles.movieYear}>{releaseYear} ∙ </span>
          <span>{genre}</span>
        </p>
        <p className={styles.movieDescription}>{overview}</p>
      </div>
      <p className={styles.movieRating}>{imdbRatingInteger}</p>
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
      <div className={movieCardShadowClassNames} />
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

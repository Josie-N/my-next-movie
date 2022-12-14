import React, { useState } from 'react';
import PropTypes from "prop-types";
import cn from "classnames";

import { useMovieListType } from "../../../store/store";
import { ADDED, RECOMMENDED } from "../../../constants/constants";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { getImdbRatingInteger, getMovieTitle } from "./utils/helper";
import styles from "./MovieCard.module.css";

import ButtonGroup from "../../../components/generic/ButtonGroup/ButtonGroup";
import Button from "../../../components/generic/Button/Button";

function MovieCard ({ movie, handleMoveToAddedList, handleMoveToRemovedList }) {
  const { _id, name, releaseYear, genre, imdbRating, overview } = movie;
  const watchlistName = useMovieListType(state => state.movieListType);

  const imdbRatingInteger = getImdbRatingInteger(imdbRating);
  const movieTitle = getMovieTitle(name);

  const [isCardHidden, setCardHidden] = useLocalStorage(false, _id);
  const [isCardActive, setCardActive] = useState(false);

  // Adds a different background color to movie cards released before a certain year
  const isMovieNew = releaseYear >= 2000;
  const movieCardShadowClassNames = cn(
    { [styles["movieCardShadow__new"]]: isMovieNew },
    { [styles["movieCardShadow__old"]]: !isMovieNew }
  );

  // Shows buttons (add, remove) when user hovers in and out of a movie card
  const handleMouseEnter = () => setCardActive(true);
  const handleMouseLeave = () => setCardActive(false);

  // Shows more or less content inside a movie card
  const handleCollapse = () => {
    setCardHidden(!isCardHidden);
  }

  if (isCardHidden) {
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
      {watchlistName === RECOMMENDED && isCardActive
        ?
        <ButtonGroup>
          <Button hasIcon icon="👎🏻" type="button"
                  handleButtonClick={(event) => handleMoveToRemovedList(_id, event)}>
            <span>REMOVE</span>
          </Button>
          <Button hasIcon icon="👍" type="button" handleButtonClick={(event) => handleMoveToAddedList(_id, event)}>
            <span>ADD</span>
          </Button>
        </ButtonGroup>
        : ''
      }
      {watchlistName === ADDED && isCardActive
        ?
        <Button hasIcon icon="👎🏻" type="button" handleButtonClick={handleMoveToRemovedList}>
          <span>BACK</span>
        </Button>
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
  handleButtonAdd: PropTypes.func,
  handleButtonRemove: PropTypes.func,
};

export default MovieCard;

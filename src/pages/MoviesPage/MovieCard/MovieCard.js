import React, { useState } from 'react';
import PropTypes from "prop-types";

import styles from "./MovieCard.module.css";

import useWatchlistName from "../../../hooks/useWatchlistName";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { ButtonLabel, Emoji } from "../../../constants/constants";
import { getFormatMovieTitle, getImdbRatingInteger } from "./utils/helper";
import { getMovieCardBackground } from "./utils/card_background_color";

import ButtonGroup from "../../../components/generic/ButtonGroup/ButtonGroup";
import Button from "../../../components/generic/Button/Button";

function MovieCard ({ movie, handleMoveToAddedList, handleMoveToRemovedList }) {
  const { _id, name, releaseYear, genre, imdbRating, overview } = movie;
  const { watchlistNameRecommended, watchlistNameAdded, watchlistNameRemoved } = useWatchlistName();

  const imdbRatingInteger = getImdbRatingInteger(imdbRating);
  const movieTitle = getFormatMovieTitle(name);

  const [isCardHidden, setCardHidden] = useLocalStorage(false, _id);
  const [isCardActive, setCardActive] = useState(false);

  // Shows different movie card styles depending on the movie release date
  const movieCardShadowClassNames = getMovieCardBackground(movie);

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
      {watchlistNameRecommended && isCardActive
        ?
        <ButtonGroup>
          <Button hasIcon icon={Emoji.ThumbsDown} type="button"
                  handleButtonClick={(event) => handleMoveToRemovedList(_id, event)}>
            <span>{ButtonLabel.Remove}</span>
          </Button>
          <Button hasIcon icon={Emoji.ThumbsUp} type="button"
                  handleButtonClick={(event) => handleMoveToAddedList(_id, event)}>
            <span>{ButtonLabel.Add}</span>
          </Button>
        </ButtonGroup>
        : ''
      }
      {(watchlistNameAdded || watchlistNameRemoved) && isCardActive
        ?
        <ButtonGroup>
          <Button hasIcon icon={Emoji.PointingLeft} type="button" handleButtonClick={handleMoveToRemovedList}>
            <span>{ButtonLabel.Back}</span>
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
  handleButtonAdd: PropTypes.func,
  handleButtonRemove: PropTypes.func,
};

export default MovieCard;

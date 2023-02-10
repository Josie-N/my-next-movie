import React, { useState } from 'react';
import PropTypes from "prop-types";

import styles from "./MovieCard.module.css";

import useWatchlistName from "../../../hooks/useWatchlistName";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { ButtonLabel, Emoji } from "../../../constants/constants";
import { getMovieCardBackground } from "./utils/card_background_color";

import ButtonGroup from "../../../components/generic/ButtonGroup/ButtonGroup";
import MovieCardHidden from "../MovieCardHidden/MovieCardHidden";
import Heading from "../../../components/generic/Heading/Heading";
import { getFormatMovieTitle } from "./utils/helper";
import ButtonMovieCard from "../ButtonMovieCard/ButtonMovieCard";

function MovieCard ({ children, movie, canBeCollapsed = false, handleMoveToAddedList, handleMoveToRemovedList }) {
  const { _id, name } = movie;
  const movieTitle = getFormatMovieTitle(name);

  const { watchlistNameRecommended, watchlistNameAdded, watchlistNameRemoved } = useWatchlistName();

  const [cardIsCollapsed, setCardCollapsed] = useLocalStorage(false, _id);
  const [isCardActive, setCardActive] = useState(false);

  // Shows different movie card styles depending on the movie release date
  const movieCardShadowClassNames = getMovieCardBackground(movie);

  // Shows/ hides buttons (ex: add, remove) when user hovers in and out of a movie card
  const handleMouseEnter = () => setCardActive(true);
  const handleMouseLeave = () => setCardActive(false);

  // Shows more or less content inside a movie card
  const handleCollapse = () => {
    if (canBeCollapsed) setCardCollapsed(!cardIsCollapsed);
  }

  if (cardIsCollapsed) {
    return (
      <MovieCardHidden handleCollapse={handleCollapse}>
        <Heading level="h4" styling={styles.movieTitle__collapsed}>{movieTitle}</Heading>
      </MovieCardHidden>
    )
  }

  return (
    <div
      tabIndex={0}
      className={styles.movieCard__open}
      onClick={handleCollapse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {watchlistNameRecommended && isCardActive
        ?
        <ButtonGroup>
          <ButtonMovieCard name={ButtonLabel.Remove} icon={Emoji.ThumbsDown}
                           handleButtonClick={(event) => handleMoveToRemovedList(_id, event)} />
          <ButtonMovieCard name={ButtonLabel.Add} icon={Emoji.ThumbsUp}
                           handleButtonClick={(event) => handleMoveToAddedList(_id, event)} />
        </ButtonGroup>
        : null
      }
      {/*Q: Can this not just be !watchlistNameRecommended ? */}
      {(watchlistNameAdded || watchlistNameRemoved) && isCardActive
        ?
        <ButtonGroup>
          <ButtonMovieCard name={ButtonLabel.Back} icon={Emoji.PointingLeft}
                           handleButtonClick={handleMoveToRemovedList} />
        </ButtonGroup>
        : null
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

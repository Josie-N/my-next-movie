import React, { useState, PropsWithChildren } from 'react';

import styles from "./MovieCard.module.css";

import { getFormatMovieTitle } from "./utils/helper";
import { getMovieCardBackground } from "./utils/card_background_color";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ButtonLabel, Emoji } from "../../../constants/constants";
import { MovieData } from "../../../types/Movies";

import { Heading } from "src/components/generic/Heading/Heading"
import { MovieCardHidden } from "../MovieCardHidden/MovieCardHidden";
import { ButtonGroupMovieCard } from "../ButtonGroupMovieCard/ButtonGroupMovieCard";
import { ButtonMovieCard } from "../ButtonMovieCard/ButtonMovieCard";
import classNames from "classnames/bind";

interface MovieCardProps {
  movie: MovieData,
  canBeCollapsed?: boolean,
  hasPrimaryActionButtons?: boolean,
  hasCardShadow?: boolean,
  handleMoveToAddedList?: (_id: string, event: React.MouseEvent<HTMLButtonElement>) => void,
  handleMoveToRemovedList?: (_id: string, event: React.MouseEvent<HTMLButtonElement>) => void,
  dataTestID?: string
}

function MovieCard({
                     children,
                     movie,
                     canBeCollapsed = false,
                     hasPrimaryActionButtons = false,
                     hasCardShadow = false,
                     handleMoveToAddedList,
                     handleMoveToRemovedList,
                     dataTestID
                   }: PropsWithChildren<MovieCardProps>) {
  const cn = classNames.bind(styles);

  const { name, _id } = movie;
  const movieTitle = getFormatMovieTitle(name);

  const [isCardActive, setCardActive] = useState(false);
  const [cardIsCollapsed, setCardCollapsed] = useLocalStorage(false, _id);

  // Shows/ hides buttons (ex: add, remove) when user hovers in and out of a movie card
  const handleMouseEnter = () => setCardActive(true);
  const handleMouseLeave = () => setCardActive(false);

  // Shows different movie card styles depending on the movie release date
  const movieCardShadowClassNames = getMovieCardBackground(movie);

  // Shows more or less content inside a movie card
  const handleCollapse = () => {
    if (canBeCollapsed) setCardCollapsed(!cardIsCollapsed);
  }

  if (cardIsCollapsed) {
    return (
      <MovieCardHidden handleCollapse={handleCollapse} dataTestID="movie-card-collapsed">
        <Heading level="h4" styling={styles.movieTitle__collapsed}>{movieTitle}</Heading>
      </MovieCardHidden>
    )
  }

  return (
    <div
      tabIndex={0}
      className={cn('movieCard__open', { 'movieCard__cursorInitial': !canBeCollapsed })}
      onClick={handleCollapse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={dataTestID}
    >
      {hasPrimaryActionButtons &&
        <ButtonGroupMovieCard
          isCardActive={isCardActive}
          removeButton={<ButtonMovieCard name={ButtonLabel.Remove} icon={Emoji.ThumbsDown}
                                         handleButtonClick={(event) => handleMoveToRemovedList ? handleMoveToRemovedList(_id, event) : null} />}
          addButton={<ButtonMovieCard name={ButtonLabel.Add} icon={Emoji.ThumbsUp}
                                      handleButtonClick={(event) => handleMoveToAddedList ? handleMoveToAddedList(_id, event) : null} />}
          backButton={<ButtonMovieCard name={ButtonLabel.Back} icon={Emoji.PointingLeft}
                                       handleButtonClick={() => {}} />}
        />}
      {children}
      {hasCardShadow && <div className={movieCardShadowClassNames} />}
    </div>
  );
}

export default MovieCard;

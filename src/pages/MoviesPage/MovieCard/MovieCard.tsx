import React, {PropsWithChildren} from 'react';
import classNames from "classnames/bind";

import styles from "./MovieCard.module.css";

import {getFormatMovieTitle} from "./utils/helper";
import {getMovieCardBackground} from "./utils/getMovieCardBackground";
import {MovieData} from "../../../types/Movies";

import {useLocalStorage} from "../../../hooks/useLocalStorage";
import useWatchlistName from "../../../hooks/useWatchlistName";
import useButtonActivationSettings from "./hooks/useButtonActivationSettings";

import ButtonGroup from "../../../components/generic/ButtonGroup/ButtonGroup";
import {Heading} from "src/components/generic/Heading/Heading"
import {MovieCardHidden} from "../MovieCardHidden/MovieCardHidden";
import {ButtonRemove} from "../ActionButtons/ButtonRemove";
import {ButtonAdd} from "../ActionButtons/ButtonAdd";
import {ButtonBookmark} from "../ActionButtons/ButtonBookmark";

interface MovieCardProps {
  movie: MovieData,
  canBeCollapsed?: boolean,
  hasActionButtons?: boolean,
  hasCardShadow?: boolean,
  handleMoveToAddedList?: (_id: string, event: React.MouseEvent<HTMLButtonElement>) => void,
  handleMoveToRemovedList?: (_id: string, event: React.MouseEvent<HTMLButtonElement>) => void,
  dataTestID?: string,
  movieCardId?: string
}

// handleMoveToAddedList and handleMoveToRemovedList need to be prop drilled even deeper into the
// ButtonAdd and ButtonRemove components.
// TO DO: Find another way to pass these handlers to the ButtonAdd and ButtonRemove components

function MovieCard({
                     children,
                     movie,
                     canBeCollapsed = false,
                     hasActionButtons = false,
                     hasCardShadow = false,
                     dataTestID,
                     movieCardId = '',
                   }: PropsWithChildren<MovieCardProps>) {
  const cn = classNames.bind(styles);
  const { watchlistNameRecommended, watchlistNameAdded, watchlistNameRemoved } = useWatchlistName();

  // Movie data
  const {name, _id} = movie;
  const movieTitle = getFormatMovieTitle(name);

  // Show different movie card styles depending on the movie card state
  const buttonActivationSettings = useButtonActivationSettings();
  const movieCardShadowClassNames = getMovieCardBackground(movie, buttonActivationSettings);

  // Local State
  const [isCardCollapsed, setCardCollapsed] = useLocalStorage(false, _id);

  // Event handlers
  // Hover in and out of a movie card
  const handleCardMouseEnter = () => buttonActivationSettings.onCardMouseEnter();
  const handleCardMouseLeave = () => buttonActivationSettings.onCardMouseLeave();

  // Show more or less content inside a movie card
  const handleCardCollapse = () => {
    // When the card is bookmarked, don't collapse it
    if(buttonActivationSettings.highlightStyle() === 'secondary') {
      setCardCollapsed(false);
      return;
    }

    if (canBeCollapsed) setCardCollapsed(!isCardCollapsed);
  }

  if (isCardCollapsed) {
    return (
      <MovieCardHidden handleCollapse={handleCardCollapse} dataTestID="movie-card-collapsed" bookmarkID={movieCardId}>
        <Heading level="h4" styling={styles.movieTitle__collapsed}>{movieTitle}</Heading>
      </MovieCardHidden>
    )
  }

  // Show buttons if the card is enabled to have buttons and is hovered
  const shouldRenderButtons = hasActionButtons;

  // Show different buttons according to the type of watchlist
  const buttonComposition = () => (
    <>
      {watchlistNameRecommended &&
          <>
            {buttonActivationSettings.isPrimaryButtonDisplayed() &&
                <ButtonGroup role="primary" movieId={_id} buttonActivationSettings={buttonActivationSettings}>
                    <ButtonAdd />
                    <ButtonRemove />
                  {/* TO DO: <ButtonAlreadySeen />*/}
                </ButtonGroup>
            }
            {buttonActivationSettings.isSecondaryButtonDisplayed() &&
                <ButtonGroup role="secondary" movieId={_id} buttonActivationSettings={buttonActivationSettings}>
                    <ButtonBookmark bookmarkId={movieCardId}/>
                </ButtonGroup>
            }
          </>
      }

      {(watchlistNameAdded || watchlistNameRemoved) &&
          <ButtonGroup role="primary" buttonActivationSettings={buttonActivationSettings}>
            {/*TO DO: <ButtonSendBack />*/}
          </ButtonGroup>
      }
    </>
  );

  return (
    <div
      tabIndex={0}
      className={cn('movieCard__open', {'movieCard__cursorInitial': !canBeCollapsed})}
      onClick={handleCardCollapse}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      data-testid={dataTestID}
      id={movieCardId}
    >
      {shouldRenderButtons && buttonComposition()}
      {children}
      {hasCardShadow && <div className={movieCardShadowClassNames}/>}
    </div>
  );
}

export default MovieCard;

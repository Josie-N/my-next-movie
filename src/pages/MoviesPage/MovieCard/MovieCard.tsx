import React, {PropsWithChildren, useState} from 'react';
import classNames from "classnames/bind";

import styles from "./MovieCard.module.css";

import {getFormatMovieTitle} from "./utils/helper";
import {getMovieCardBackground} from "./utils/card_background_color";
import {useLocalStorage} from "../../../hooks/useLocalStorage";
import {ButtonLabel, Emoji} from "../../../constants/constants";
import {MovieData} from "../../../types/Movies";

import {Heading} from "src/components/generic/Heading/Heading"
import {MovieCardHidden} from "../MovieCardHidden/MovieCardHidden";
import {ButtonGroupMovieCard} from "../ButtonGroupMovieCard/ButtonGroupMovieCard";
import {ButtonMovieCard} from "../ButtonMovieCard/ButtonMovieCard";
import useBookmarkStore from "../../../store/bookmarkStore";

interface MovieCardProps {
  movie: MovieData,
  canBeCollapsed?: boolean,
  hasPrimaryActionButtons?: boolean,
  hasCardShadow?: boolean,
  handleMoveToAddedList?: (_id: string, event: React.MouseEvent<HTMLButtonElement>) => void,
  handleMoveToRemovedList?: (_id: string, event: React.MouseEvent<HTMLButtonElement>) => void,
  dataTestID?: string,
  movieCardId?: string
}

function MovieCard({
                     children,
                     movie,
                     canBeCollapsed = false,
                     hasPrimaryActionButtons = false,
                     hasCardShadow = false,
                     handleMoveToAddedList,
                     handleMoveToRemovedList,
                     dataTestID,
                     movieCardId = '',
                   }: PropsWithChildren<MovieCardProps>) {
  const cn = classNames.bind(styles);

  // Movie content data
  const {name, _id} = movie;
  const movieTitle = getFormatMovieTitle(name);

  // Global State
  const {storeBookmarkId, removeBookmarkId} = useBookmarkStore();

  // Local State
  // Control movie card as a whole
  // TO DO: You need to use isCardActive directly in MovieCard to show/ hide the movie card buttons
  // Right now it depends on watchlistNameRecommended inside ButtonGroupMovieCard, it's pretty sketchy
  // ButtonGroupMovieCard (soon to be renamed ButtonFilter) should be responsible for filtering the buttons,
  // not for showing/ hiding them
  const [isCardActive, setCardActive] = useState(false);
  //  TO DO: I think this is supposed to be cardIsOpen? Is seems like the logic is reversed
  // Previous feedback was that it's not easy to understand what false is without going inside the useLocalStorage hook
  const [cardIsCollapsed, setCardCollapsed] = useLocalStorage(false, _id);

  //  Control movie card buttons
  // IDEA: Combine arePrimaryButtonsActive and isBookmarkButtonActive into one state
  // something like: const [activeButtons, setActiveButtons] = useState([]); inside a custom hook
  // Is it a good idea to have an array that remembers which buttons are active?
  const [arePrimaryButtonsActive, setPrimaryButtonsActive] = useState(false);

  // TO DO: This state can be moved to a different component
  const [isBookmarkButtonActive, setBookmarkButtonActive] = useState(false);

  //  Show movie card highlight styles
  // Idea: these two states can be combined into one
  const [isMainHighlightStyle, setMainHighlightStyle] = useState(false);
  const [isSecondHighlightStyle, setSecondHighlightStyle] = useState(false);


  // const [hlStyle, setHlStyle] = useState({});

  // Control what happens once a movie card is bookmarked
  // Maybe it should be wasCardBookmarked?
  // TO DO: This state can be moved to a different component
  const [isCardBookmarked, setCardBookmarked] = useState(false);


  // Event handlers
  // Hover in and out of a movie card
  const handleCardMouseEnter = () => {
    setCardActive(true);
    // Remove here:
    setPrimaryButtonsActive(true);
  }

  const handleCardMouseLeave = () => {
    setCardActive(false);
    // Remove here:
    setPrimaryButtonsActive(false);
  }

  // Show more or less content inside a movie card
  const handleCardCollapse = () => {
    if(isSecondHighlightStyle) {
      setCardCollapsed(false);
      return;
    }

    if (canBeCollapsed) setCardCollapsed(!cardIsCollapsed);
  }

  const handleBookmarkToggle = () => {
    // What I tried initially:
    // setCardCollapsed(false);
    isCardBookmarked ? removeBookmarkId(movieCardId) : storeBookmarkId(movieCardId);

    setSecondHighlightStyle(!isCardBookmarked);
    setCardBookmarked(!isCardBookmarked);
  }

  // const handleBookmarkMouseEnter = () => {
  //
  // }

  // Show different movie card styles depending on the movie card state
  const movieCardShadowClassNames = getMovieCardBackground(movie, isSecondHighlightStyle, isMainHighlightStyle);

  if (cardIsCollapsed) {
    return (
      <MovieCardHidden handleCollapse={handleCardCollapse} dataTestID="movie-card-collapsed" bookmarkID={movieCardId}>
        <Heading level="h4" styling={styles.movieTitle__collapsed}>{movieTitle}</Heading>
      </MovieCardHidden>
    )
  }

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
      {/* How can I refactor this into something more manageable? */}
          <ButtonGroupMovieCard
              isCardActive={isCardActive}
              bookmarkButton={
                <ButtonMovieCard
                  name={isBookmarkButtonActive? ButtonLabel.Remember : ''}
                  icon={'📌'}
                  handleButtonClick={handleBookmarkToggle}
                  handleMouseEnter={
                    () => {
                      // setHlStyle({...hlStyle, primaryButtonActive: true, })
                      setBookmarkButtonActive(true);
                      setSecondHighlightStyle(true);
                      setPrimaryButtonsActive(false);
                    }
                  }
                  handleMouseLeave={
                    () => {
                      setBookmarkButtonActive(false);
                      setPrimaryButtonsActive(true);

                      if (!isCardBookmarked) {
                        setSecondHighlightStyle(false);
                      }
                    }
                  }
                />
              }
          />

      {/*
      Idea: Do (hasPrimaryActionButtons && isCardActive)
            Remove isCardActive={isCardActive} from ButtonGroupMovieCard
            Remove setPrimaryButtonsActive(true); from handleCardMouseEnter & handleCardMouseLeave
      */}
      {(hasPrimaryActionButtons && arePrimaryButtonsActive) &&
          <ButtonGroupMovieCard
              isCardActive={isCardActive}
              removeButton={
                <ButtonMovieCard
                  name={ButtonLabel.Remove} icon={Emoji.ThumbsDown}
                  hasPrimaryActionButtons
                  handleButtonClick={
                    (event) => {
                      handleMoveToRemovedList?.(_id, event);
                      if (handleMoveToRemovedList) {
                        setMainHighlightStyle(false);
                        setSecondHighlightStyle(false);
                        setCardBookmarked(false);
                      }
                    }
                  }
                  handleMouseEnter={() => {
                    setMainHighlightStyle(true);
                    setSecondHighlightStyle(false);
                  }}
                  handleMouseLeave={() => {
                    setMainHighlightStyle(false);
                    if(isCardBookmarked) {
                      setSecondHighlightStyle(true);
                    }
                  }}
                />
              }
              addButton={
                <ButtonMovieCard
                  name={ButtonLabel.Add} icon={Emoji.ThumbsUp}
                  hasPrimaryActionButtons
                  handleButtonClick={
                    (event) =>  {
                      handleMoveToAddedList?.(_id, event);
                      if (handleMoveToAddedList) {
                        setMainHighlightStyle(false);
                        setSecondHighlightStyle(false);
                        // EXPERIMENTAL:
                        // PROBABLY THE SOLUTI0N:
                        setCardBookmarked(false);
                      }
                    }
                  }
                  handleMouseEnter={() => {
                    setMainHighlightStyle(true);
                    setSecondHighlightStyle(false);
                  }}
                  // handleMouseLeave={() => setMainHighlightStyle(false)}
                  handleMouseLeave={() => {
                    setMainHighlightStyle(false);


                    // TO DO (30th JAN): There's a bug where if you bookmark a card
                    // and then press the Add or Remove button,
                    // the background is still green

                    // UPDATE ON BUG (31st JAN):
                    // Now when you press Add or Remove button
                    // the background is no longer green,
                    // BUT the movie card is still bookmarked
                    if(isCardBookmarked) {
                      setSecondHighlightStyle(true);
                    }
                  }}
                />
              }
              backButton={
                <ButtonMovieCard
                  name={ButtonLabel.Back} icon={Emoji.PointingLeft}
                  hasPrimaryActionButtons
                  handleButtonClick={() => {}}
                />
              }
          />
      }
      {children}
      {hasCardShadow && <div className={movieCardShadowClassNames}/>}
    </div>
  );
}

export default MovieCard;

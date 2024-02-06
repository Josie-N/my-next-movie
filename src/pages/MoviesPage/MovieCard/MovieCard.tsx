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
import {ButtonFilter} from "../ButtonFilter/ButtonFilter";
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

  // Movie data
  const {name, _id} = movie;
  const movieTitle = getFormatMovieTitle(name);

  // Global State
  const {storeBookmarkId, removeBookmarkId} = useBookmarkStore();

  // Local State
  // Control what happens when a movie card is hovered
  const [isCardActive, setCardActive] = useState(false);
  //  TO DO: I think this is supposed to be cardIsOpen? Is seems like the logic is reversed
  // Previous feedback was that it's not easy to understand what false is without going inside the useLocalStorage hook
  const [cardIsCollapsed, setCardCollapsed] = useLocalStorage(false, _id);

  //  Control movie card buttons
  // IDEA: Combine arePrimaryButtonsActive and isBookmarkButtonActive into one state
  // something like: const [activeButtons, setActiveButtons] = useState([]); inside a custom hook
  // Is it a good idea to have an array that remembers which buttons are active?
  const [arePrimaryButtonsActive, setPrimaryButtonsActive] = useState(false);

  // NEW (5th Feb):
  // Need to create a custom hook
  // useButtonActivation
  // ButtonActivationSettings
  // const [buttonCategory, setButtonCategory] = useButtonCategoryFilter();

  // TO DO: This state can be moved to a different component
  const [isBookmarkButtonActive, setBookmarkButtonActive] = useState(false);

  const[highlightStyle, setHighlightStyle] = useState('none');

  // Controls what happens once a movie card is bookmarked
  // Maybe it should be wasCardBookmarked?
  // TO DO: This state can be moved to a different component
  const [isCardBookmarked, setCardBookmarked] = useState(false);


  // Event handlers
  // Hover in and out of a movie card
  const handleCardMouseEnter = () => setCardActive(true);
  const handleCardMouseLeave = () => setCardActive(false);

  // Show more or less content inside a movie card
  const handleCardCollapse = () => {
    if(highlightStyle === 'second') {
        setCardCollapsed(false);
        return;
    }

    if (canBeCollapsed) setCardCollapsed(!cardIsCollapsed);
  }

  const handleBookmarkToggle = () => {
    // What I tried initially:
    // setCardCollapsed(false);
    isCardBookmarked ? removeBookmarkId(movieCardId) : storeBookmarkId(movieCardId);

    // Toggle: if card is already bookmarked, remove style (set to 'none').
    //         if the card is not yet bookmarked, set to 'second'
    setHighlightStyle(isCardBookmarked ? 'none' : 'second');
    setCardBookmarked(!isCardBookmarked);
  }

  // Show different movie card styles depending on the movie card state
  const movieCardShadowClassNames = getMovieCardBackground(movie, highlightStyle);

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
      {isCardActive &&
          <ButtonFilter
              bookmarkButton={
                <ButtonMovieCard
                  name={isBookmarkButtonActive? ButtonLabel.Remember : ''}
                  icon={'📌'}
                  handleButtonClick={handleBookmarkToggle}
                  handleMouseEnter={
                    () => {
                      // setHlStyle({...hlStyle, primaryButtonActive: true, })
                      setBookmarkButtonActive(true);

                      setHighlightStyle('second');
                      setPrimaryButtonsActive(false);
                    }
                  }
                  handleMouseLeave={
                    () => {
                      setBookmarkButtonActive(false);
                      setPrimaryButtonsActive(true);

                      if (!isCardBookmarked) {
                        setHighlightStyle('none');
                      }
                    }
                  }
                />
              }
          />
      }
      {/* NEW: */}
      {/* If we do this: */}
      {/* {hasPrimaryActionButtons && buttonCategory.primary === 'active' && ( */}
      {/* Do we still need isCardActive? */}
      {(hasPrimaryActionButtons && isCardActive) &&
      <ButtonFilter
        removeButton={
          <ButtonMovieCard
            name={ButtonLabel.Remove} icon={Emoji.ThumbsDown}
            hasPrimaryActionButtons
            handleButtonClick={
              (event) => {
                handleMoveToRemovedList?.(_id, event);
                if (handleMoveToRemovedList) {
                  setHighlightStyle('none');
                  setCardBookmarked(false);
                }
              }
            }
            handleMouseEnter={() => setHighlightStyle('main')}
            handleMouseLeave={() => {
              setHighlightStyle('none');

              if(isCardBookmarked) setHighlightStyle('second');
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
                  setHighlightStyle('none');

                  // EXPERIMENTAL:
                  // PROBABLY THE SOLUTI0N:
                  // (1st FEB) Probably the reason for the bug? Not sure
                  // Why is it not unbookmarking the card?
                  setCardBookmarked(false);
                }
              }
            }
            handleMouseEnter={() => setHighlightStyle('main')}
            handleMouseLeave={() => {
              setHighlightStyle('none');

              // TO DO (30th JAN): There's a bug where if you bookmark a card
              // and then press the Add or Remove button,
              // the background is still green

              // UPDATE ON BUG (31st JAN):
              // Now when you press Add or Remove button:
              // -> the background is no longer green,
              // -> it removes the card,
              // -> BUT the movie card underneath the one being Added/ Removed is still bookmarked
              // -> despite the background not being green
              if(isCardBookmarked) setHighlightStyle('second');
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

import ButtonGroup from "../../../components/generic/ButtonGroup/ButtonGroup";
import React from "react";
import useWatchlistName from "../../../hooks/useWatchlistName";
import styles from "./ButtonGroupMovieCard.module.css";

type Props = {
  isCardActive: boolean,
  removeButton?: JSX.Element,
  addButton?: JSX.Element,
  backButton?: JSX.Element,
  bookmarkButton?: JSX.Element,
}

// ButtonFilter
// responsibility: filter buttons according to watchlist type
export function ButtonGroupMovieCard({ isCardActive, removeButton, addButton, backButton, bookmarkButton }: Props) {
  const { watchlistNameRecommended } = useWatchlistName();

  // If card is not active, don't render anything
  if (!isCardActive) return null;

  // Maybe make it a bit more explicit?
  // Say if it's any kind of list except for the recommended list, then show only back button
  // Remember to update the unit tests
  if (watchlistNameRecommended) {
    return (
      <ButtonGroup>
        <div className={styles.buttonGroup__primary}>{removeButton}{addButton}</div>
        <div className={styles.buttonGroup__secondary}>{bookmarkButton}</div>
      </ButtonGroup>
    )
  }

  return (
    <ButtonGroup>
      <div className={styles.buttonGroup__primary}>{backButton}</div>
    </ButtonGroup>
  )
}

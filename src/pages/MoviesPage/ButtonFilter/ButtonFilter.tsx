import React from "react";
import styles from "./ButtonFilter.module.css";

import useWatchlistName from "../../../hooks/useWatchlistName";
import ButtonGroup from "../../../components/generic/ButtonGroup/ButtonGroup";

type Props = {
  removeButton?: JSX.Element,
  addButton?: JSX.Element,
  backButton?: JSX.Element,
  bookmarkButton?: JSX.Element,
}

// Filter buttons according to watchlist type
export function ButtonFilter({ removeButton, addButton, bookmarkButton, backButton }: Props) {
  const { watchlistNameRecommended } = useWatchlistName();

  // TO DO: Add unit tests
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

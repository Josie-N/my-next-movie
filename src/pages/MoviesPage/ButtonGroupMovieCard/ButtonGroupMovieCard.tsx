import ButtonGroup from "../../../components/generic/ButtonGroup/ButtonGroup";
import React from "react";
import useWatchlistName from "../../../hooks/useWatchlistName";

type Props = {
  isCardActive: boolean,
  removeButton: JSX.Element,
  addButton: JSX.Element,
  backButton: JSX.Element,
}

export default function ButtonGroupMovieCard({ isCardActive, removeButton, addButton, backButton }: Props) {
  const { watchlistNameRecommended } = useWatchlistName();

  if (!isCardActive) return null;

  if (watchlistNameRecommended) {
    return (
      <ButtonGroup>{removeButton}{addButton}</ButtonGroup>
    )
  }

  return (
    <ButtonGroup>{backButton}</ButtonGroup>
  )
}

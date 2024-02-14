import classNames from "classnames/bind";
import styles from "../MovieCard.module.css";
import { MovieData } from "../../../../types/Movies";
import useButtonActivationSettings from "../hooks/useButtonActivationSettings";
import {useEffect} from "react";

interface ButtonActivationSettings {
  highlightStyle: () => string,
}

// Adds a different background style to movie cards
export const getMovieCardBackground = (movie: MovieData, buttonActivationSettings: ButtonActivationSettings) : string => {
  const { releaseYear } = movie;

  const isRecentMovie = releaseYear >= 2000;  // 2000 ~ present
  const isClassicMovie = releaseYear >= 1975 && releaseYear < 2000;  // 1975 ~ 1999
  const isVintageMovie = releaseYear < 1975;  // ... ~ 1974

  const cn = classNames.bind(styles);
  const movieCardShadowClassNames = cn(
    { 'movieCardShadow__recent': isRecentMovie },
    { 'movieCardShadow__classic': isClassicMovie },
    { 'movieCardShadow__vintage': isVintageMovie },
    { 'movieCardShadow__forMainActions': buttonActivationSettings.highlightStyle() === 'primary' },
    { 'movieCardShadow__forSecondActions': buttonActivationSettings.highlightStyle() === 'secondary' },
  );

  return movieCardShadowClassNames;
}

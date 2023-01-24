import classNames from "classnames/bind";
import styles from "../MovieCard.module.css";
import { MovieData } from "../../../../types/Movies";

// Adds a different background color to movie cards depending on their release date
export const getMovieCardBackground = (movie: MovieData) => {
  const { releaseYear } = movie;

  const isMovieNew = releaseYear >= 2000;  // 2000 ~ present
  const isMovieOlder = releaseYear >= 1975 && releaseYear < 2000;  // 1975 ~ 1999
  const isMovieOld = releaseYear < 1975;  // ... ~ 1974

  const cn = classNames.bind(styles);
  const movieCardShadowClassNames = cn(
    { 'movieCardShadow__new': isMovieNew },
    { 'movieCardShadow_older': isMovieOlder },
    { 'movieCardShadow__old': isMovieOld },
  );

  return movieCardShadowClassNames;
}

import React from "react";

import styles from "./MovieCardContent.module.css";

import {getFormatMovieTitle, getImdbRatingInteger} from "../MovieCard/utils/helper";
import {MovieData} from "../../../types/Movies";

type Props = {
  movie: MovieData
}

export function MovieCardContent({movie}: Props) {
  const {name, releaseYear, genre, imdbRating, overview} = movie;
  const imdbRatingInteger = getImdbRatingInteger(imdbRating);
  const movieTitle = getFormatMovieTitle(name);

  return (
    <>
      <div className={styles.contentContainer}>
        <h4 className={styles.movieTitle}>{movieTitle}</h4>
        <p className={styles.movieDetails}>
          <span className={styles.movieYear}>{releaseYear} ∙ </span>
          <span data-testid="movie-genre">{genre}</span>
        </p>
        <p className={styles.movieDescription} data-testid="movie-description">
          {overview}</p>
      </div>
      <p className={styles.movieRating} data-testid="movie-rating">
        {imdbRatingInteger}
      </p>
    </>
  )
}

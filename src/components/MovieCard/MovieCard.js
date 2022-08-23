import React, { useState } from 'react';
import styles from "./MovieCard.module.css";

function MovieCard ({ movie }) {
  const [isCollapsed, setCollapsed] = useState(false);

  const { name, genre, director, imdbRating, overview } = movie;
  const title = name.replace(/The /gm, '');

  const handleCollapse = () => setCollapsed(!isCollapsed);

  if (isCollapsed) {
    return (
      <div
        tabIndex="0"
        className={styles.movieCard__collapsed}
        onClick={handleCollapse}
      >
        <h4 className={styles.movieTitle__collapsed}>{title}</h4>
      </div>
    )
  }

  return (
    <div
      tabIndex="0"
      className={styles.movieCard__open}
      onClick={handleCollapse}
    >
      <div className={styles.movieCardInner}>
        <h4 className={styles.movieTitle__open}>{title}</h4>
        <p className={styles.movieDetails}>{genre} ∙ {director}</p>
        <p className={styles.movieDescription}>{overview}</p>
      </div>
      <p className={styles.movieRating}>{imdbRating}</p>
    </div>
  );
}

export default MovieCard;

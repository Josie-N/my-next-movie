import React from 'react';
import styles from "./MovieCard.module.css";

function MovieCard ({ movies, handleDelete }) {

  return (
    <>
      {movies.map(movie => {
        const { _id, name, genre, director, imdbRating, overview } = movie;
        const title = name.replace(/The /gm, '');

        return (
          <div key={_id} tabindex="0" className={styles.cardMainContainer}>
            <div>
              <h4 className={styles.movieTitle}>{title}</h4>
              <p className={styles.movieDetails}>{genre} ∙ {director}</p>
              <p className={styles.movieDescription}>{overview}</p>
            </div>
            <p className={styles.movieRating}>{imdbRating}</p>
            {/*<button type="button" className={styles.deleteMovieButton}*/}
            {/*  // Lift up the state back to the parent component*/}
            {/*        onClick={() => handleDelete(movies, movie)}>*/}
            {/*  X*/}
            {/*</button>*/}
          </div>
        )
      })}
    </>
  );
}

export default MovieCard;
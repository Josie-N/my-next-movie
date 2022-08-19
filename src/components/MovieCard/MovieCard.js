import React from 'react';
import styles from "./MovieCard.module.css";
import Like from "../Like/Like";

function MovieCard ({ movies, handleDelete }) {

  return (
    <>
      {movies.map(movie => {
        const { _id, name, genre, director, imdbRating, overview } = movie;
        const title = name.replace(/The /gm, '');

        return (
          <>
            <div key={_id} className={styles.cardMainContainer}>
              <div>
                <p>{imdbRating}</p>
                <div className={styles.movieTitleContainer}>
                  <h4 className={styles.movieTitle}>{title}</h4>
                  <Like />
                </div>
                <p>{genre} ∙ {director}</p>
                <p>{overview}</p>
              </div>
              <button type="button" className={styles.deleteMovieButton}
                // Lift up the state back to the parent component
                      onClick={() => handleDelete(movies, movie)}>
                X
              </button>
            </div>
          </>
        )
      })}
    </>
  );
}

export default MovieCard;
export const getImdbRatingInteger = (movieRating) => {
  return Math.round(movieRating * 10);
}

// Removes the word 'The' from the beginning of movie titles
export const getMovieTitle = (movieName) => {
  return movieName.replace(/The /gm, '');
}

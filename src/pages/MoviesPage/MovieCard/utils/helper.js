export const getImdbRatingInteger = (movieRating: number): number => {
  return Math.round(movieRating * 10);
}

// Removes the word 'The' from the beginning of movie titles
export const getMovieTitle = (movieName: string): string => {
  return movieName.replace(/The /gm, '');
}

// Adds a number (integer) that increases by 1 after every X amount of movies are listed
export const getPageNumber = (movieCardIndex, numberOfMoviesPerPage) => {
  const quotient = movieCardIndex / numberOfMoviesPerPage;
  const pageNumber = Math.floor(quotient) + 1;

  return { pageNumber };
}

export const getPageFirstCard = (index, numberOfMoviesPerPage) => {
  // Output: 0, 5, 10, 15, ...
  const indexOfFirstCardOnEachPage = (numberOfMoviesPerPage - 5);
  const showPageNumberOnFirstCard = (index % numberOfMoviesPerPage) === indexOfFirstCardOnEachPage;

  return { showPageNumberOnFirstCard };
}

export const getPageLastCard = (movieCardIndex, numberOfMoviesPerPage) => {
  // Output: 4, 9, 14, 19, ...
  const indexOfLastCardOnEachPage = (numberOfMoviesPerPage - 1);
  const showPageNumberOnLastCard = (movieCardIndex % numberOfMoviesPerPage) === indexOfLastCardOnEachPage;

  return { showPageNumberOnLastCard };
}

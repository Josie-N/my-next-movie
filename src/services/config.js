import { URL } from "../constants/constants";

export const getUrlMovieList = (nextCursor, numberOfMoviesPerPage, username, listName) => {
  const cursorParam = `cursor=${nextCursor}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;
  const listNameParam = `list=${listName}`;
  const usernameParam = `username=${username}`;

  const url = URL.movies + '?' + cursorParam + '&' + moviePageLimitParam + '&' + listNameParam + '&' + usernameParam;
  return url;
}

export const postUrlMovieList = (id, username, listName) => {
  const movieIdParam = `movieId=${id}`;
  const listTypeParam = `list=${listName}`;
  const usernameParam = `username=${username}`;

  const url = URL.movie + '?' + movieIdParam + '&' + listTypeParam + '&' + usernameParam;
  return url;
}

export const getUsername = (username) => {
  const usernameParam = `username=${username}`;

  const url = URL.user + '?' + usernameParam;
  return url;
}

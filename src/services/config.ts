import {URL} from "../constants/constants";

export const getUrlMovieList = (nextCursor: string, numberOfMoviesPerPage: number, username: string, listName: string) => {
  const cursorParam = `cursor=${nextCursor}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;
  const listNameParam = `list=${listName}`;
  const usernameParam = `username=${encodeURIComponent(username)}`;

  const url = URL.movies + '?' + cursorParam + '&' + moviePageLimitParam + '&' + listNameParam + '&' + usernameParam;
  return url;
}

export const postUrlMovieList = (id: string, username: string, listName: string) => {
  const movieIdParam = `movieId=${id}`;
  const listTypeParam = `list=${listName}`;
  const usernameParam = `username=${encodeURIComponent(username)}`;

  const url = URL.movie + '?' + movieIdParam + '&' + listTypeParam + '&' + usernameParam;
  return url;
}

export const getUsername = (username: string) => {
  const usernameParam = `username=${encodeURIComponent(username)}`;

  const url = URL.user + '?' + usernameParam;
  return url;
}

import { URL } from "../constants/constants";

export const getUrlMovieList = (currentPage, numberOfMoviesPerPage, username, listName) => {
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;
  const listNameParam = `list=${listName}`;
  const usernameParam = `username=${username}`;

  const url = URL.movies + '?' + currentPageParam + '&' + moviePageLimitParam + '&' + listNameParam + '&' + usernameParam;
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

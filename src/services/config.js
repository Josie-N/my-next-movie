import { baseURL, baseURL_2 } from "../constants/constants";

export const getUrlMovieList = (currentPage, numberOfMoviesPerPage, username, listName) => {
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;
  const listNameParam = `list=${listName}`;
  const usernameParam = `username=${username}`;

  const url = baseURL + '?' + currentPageParam + '&' + moviePageLimitParam + '&' + listNameParam + '&' + usernameParam;
  return url;
}

export const postUrlMovieList = (id, username, listName) => {
  const movieIdParam = `movieId=${id}`;
  const listTypeParam = `list=${listName}`;
  const usernameParam = `username=${username}`;

  const url = baseURL_2 + '?' + movieIdParam + '&' + listTypeParam + '&' + usernameParam;
  return url;
}

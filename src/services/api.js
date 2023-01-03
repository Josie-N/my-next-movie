import axios from "axios";
import { baseURL, baseURL_2, MovieListType } from "../constants/constants";

export const getMovieList = async (currentPage, numberOfMoviesPerPage, username, listName) => {
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;

  const listNameParam = `list=${listName}`;
  const usernameParam = `username=${username}`;

  const url = baseURL + '?' + currentPageParam + '&' + moviePageLimitParam + '&' + listNameParam + '&' + usernameParam;
  const json = await axios.get(url);

  return json.data;
}

export const getAddedMovieList = (currentPage, numberOfMoviesPerPage, username) => {
  return getMovieList(currentPage, numberOfMoviesPerPage, username, MovieListType.Added);
}

export const getRemovedMovieList = (currentPage, numberOfMoviesPerPage, username) => {
  return getMovieList(currentPage, numberOfMoviesPerPage, username, MovieListType.Removed);
}

export const getRecommendedMovieList = async (currentPage, numberOfMoviesPerPage, username) => {
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;

  const listNameParam = `list=recommended`;  // TO DO: fix hardcoded issue
  const usernameParam = `username=${username}`;

  const url = baseURL + '?' + currentPageParam + '&' + moviePageLimitParam + '&' + listNameParam + '&' + usernameParam;
  const json = await axios.get(url);

  return json.data;
}

export const postToMovieList = async (id, username, listName) => {
  const movieIdParam = `movieId=${id}`;

  const listTypeParam = `list=${listName}`;
  const usernameParam = `username=${username}`;

  const url = baseURL_2 + '?' + movieIdParam + '&' + listTypeParam + '&' + usernameParam;
  const response = await axios.post(url);

  return response.data;
}

export const postToAddedMovieList = (id, username) => {
  return postToMovieList(id, username, MovieListType.Added);
}

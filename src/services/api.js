import axios from "axios";
import { ADDED, baseURL, baseURL_2, REMOVED } from "../constants/constants";

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
  return getMovieList(currentPage, numberOfMoviesPerPage, username, ADDED);
}

export const getRemovedMovieList = (currentPage, numberOfMoviesPerPage, username) => {
  return getMovieList(currentPage, numberOfMoviesPerPage, username, REMOVED);
}

export const getRecommendedMovieList = async (currentPage, numberOfMoviesPerPage, username) => {
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;

  console.log(username, 'username');
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
  return postToMovieList(id, username, ADDED);
}

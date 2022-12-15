import axios from "axios";
import { ADDED, baseURL, REMOVED } from "../constants/constants";

export const getRecommendedMovieList = async (currentPage, numberOfMoviesPerPage) => {
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;

  const url = baseURL + '?' + currentPageParam + '&' + moviePageLimitParam;
  const json = await axios.get(url);

  return json.data;
}

export const getAddedMovieList = (currentPage, numberOfMoviesPerPage) => {
  return getMovieList(currentPage, numberOfMoviesPerPage, ADDED);
}

export const getRemovedMovieList = (currentPage, numberOfMoviesPerPage) => {
  return getMovieList(currentPage, numberOfMoviesPerPage, REMOVED);
}

export const getMovieList = async (currentPage, numberOfMoviesPerPage, listName) => {
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;

  const listNameParam = `list=${listName}`;
  const usernameParam = `username=sad-panda`;   // hardcoded for now, will be replaced with generated username

  const url = baseURL + '?' + currentPageParam + '&' + moviePageLimitParam + '&' + listNameParam + '&' + usernameParam;
  const json = await axios.get(url);

  return json.data;
}

export const postToAddedMovieList = (id) => {
  return postToMovieList(id, ADDED);
}

export const postToMovieList = async (id) => {
  const movieIdParam = `movieId=${id}`;

  const listTypeParam = `list=added`;   // hardcoded, will be replaced with list type
  const usernameParam = `username=sad-panda`;   // hardcoded for now, will be replaced with generated username

  const url = baseURL + '?' + movieIdParam + '&' + listTypeParam + '&' + usernameParam;
  const response = await axios.post(url);

  return response.data;
}

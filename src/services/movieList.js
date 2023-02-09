import { MovieListType, numberOfMoviesPerPage } from "../constants/constants";
import { getUrlMovieList, postUrlMovieList } from "./config";

export const getRecommendedMovieList = (cursor, username) => {
  return getUrlMovieList(cursor, numberOfMoviesPerPage, username, MovieListType.Recommended);
}

export const getAddedMovieList = (cursor, username) => {
  return getUrlMovieList(cursor, numberOfMoviesPerPage, username, MovieListType.Added);
}

export const getRemovedMovieList = (cursor, username) => {
  return getUrlMovieList(cursor, numberOfMoviesPerPage, username, MovieListType.Removed);
}

export const postToAddedMovieList = (id, username) => {
  return postUrlMovieList(id, username, MovieListType.Added);
}

export const postToRejectedMovieList = (id, username) => {
  return postUrlMovieList(id, username, MovieListType.Removed);
}

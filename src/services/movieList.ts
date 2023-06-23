import { MovieListType, numberOfMoviesPerPage } from "../constants/constants";
import { getUrlMovieList, postUrlMovieList } from "./config";

export const getRecommendedMovieList = (cursor: string, username: string) => {
  return getUrlMovieList(cursor, numberOfMoviesPerPage, username, MovieListType.Recommended);
}

export const getAddedMovieList = (cursor: string, username: string) => {
  return getUrlMovieList(cursor, numberOfMoviesPerPage, username, MovieListType.Added);
}

export const getRemovedMovieList = (cursor: string, username: string) => {
  return getUrlMovieList(cursor, numberOfMoviesPerPage, username, MovieListType.Removed);
}

export const postToAddedMovieList = (id: string, username: string) => {
  return postUrlMovieList(id, username, MovieListType.Added);
}

export const postToRejectedMovieList = (id: string, username: string) => {
  return postUrlMovieList(id, username, MovieListType.Removed);
}

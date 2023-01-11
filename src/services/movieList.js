import { MovieListType, numberOfMoviesPerPage } from "../constants/constants";
import { getUrlMovieList } from "./urlParams";

export const getRecommendedMovieList = (currentPage, username) => {
  return getUrlMovieList(currentPage, numberOfMoviesPerPage, username, MovieListType.Recommended);
}

export const getAddedMovieList = (currentPage, numberOfMoviesPerPage, username) => {
  return getUrlMovieList(currentPage, numberOfMoviesPerPage, username, MovieListType.Added);
}

export const getRemovedMovieList = (currentPage, numberOfMoviesPerPage, username) => {
  return getUrlMovieList(currentPage, numberOfMoviesPerPage, username, MovieListType.Removed);
}

// export const postToAddedMovieList = (id, username) => {
//   return postToMovieList(id, username, MovieListType.Added);
// }
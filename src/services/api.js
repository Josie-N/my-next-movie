import axios from "axios";

// const base = `https://josie-moviehut.herokuapp.com/api/movies`;
const base = `https://ca01e78c-5278-4996-be9f-f176a7af488f.mock.pstmn.io/api/movies`;

export const getRecommendedMovieList = async (currentPage, numberOfMoviesPerPage) => {
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;

  const url = base + '?' + currentPageParam + '&' + moviePageLimitParam;
  const json = await axios.get(url);

  return json.data;
}

export const getAddedMovieList = (currentPage, numberOfMoviesPerPage) => {
  return getMovieList(currentPage, numberOfMoviesPerPage, 'added');
}

export const getRemovedMovieList = (currentPage, numberOfMoviesPerPage) => {
  return getMovieList(currentPage, numberOfMoviesPerPage, 'removed');
}

export const getMovieList = async (currentPage, numberOfMoviesPerPage, listName) => {
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;

  const listNameParam = `list=${listName}`;
  const usernameParam = `username=sad-panda`;   // hardcoded for now, will be replaced with generated username

  const url = base + '?' + currentPageParam + '&' + moviePageLimitParam + '&' + listNameParam + '&' + usernameParam;
  const json = await axios.get(url);

  return json.data;
}

export const postToAddedMovieList = (id) => {
  return postToMovieList(id, 'added');
}

export const postToMovieList = async (id) => {
  const movieIdParam = `movieId=${id}`;

  const listTypeParam = `list=added`;   // hardcoded, will be replaced with list type
  const usernameParam = `username=sad-panda`;   // hardcoded for now, will be replaced with generated username

  const url = base + '?' + movieIdParam + '&' + listTypeParam + '&' + usernameParam;
  const response = await axios.post(url);

  return response.data;
}

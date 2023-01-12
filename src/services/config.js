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


// ORIGINALS:

// export const getMovieList = async (currentPage, numberOfMoviesPerPage, username, listName) => {
//   const currentPageParam = `page=${currentPage}`;
//   const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;
//
//   const listNameParam = `list=${listName}`;
//   const usernameParam = `username=${username}`;
//
//   const url = baseURL + '?' + currentPageParam + '&' + moviePageLimitParam + '&' + listNameParam + '&' +
// usernameParam;
// const json = await axios.get(url);
// return json.data;
// }


// Don't forget: has the same name as function in movielist.js
//
// export const getRecommendedMovieList = async (currentPage, numberOfMoviesPerPage, username) => {
// const currentPageParam = `page=${currentPage}`;
// const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;
// const listNameParam = `list=recommended`;  // TO DO: fix hardcoded issue
// const usernameParam =`username=${username}`;
// const url = baseURL + '?' + currentPageParam + '&' + moviePageLimitParam + '&' +
// listNameParam + '&' + usernameParam;
// const json = await axios.get(url);
// return json.data;
// }
//
//
// export const postToMovieList = async (id, username, listName) => {
// const movieIdParam = `movieId=${id}`;
// const listTypeParam = `list=${listName}`;
// const usernameParam = `username=${username}`;
// const url = baseURL_2 + '?' + movieIdParam + '&' + listTypeParam + '&' + usernameParam;
// const response = await axios.post(url);
// return response.data;
// }
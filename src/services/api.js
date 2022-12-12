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

export const postMovietoAddedList = async (id) => {
  const movieId = `movieId=${id}`;

  const listType = `list=added`;   // hardcoded, will be replaced with list type
  const username = `username=sad-panda`;   // hardcoded, will be replaced with generated username

  const url = base + '?' + movieId + '&' + listType + '&' + username;
  const response = await axios.post(url);

  return response.data;

  try {
    const response = await axios.post(url);
  } catch (err) {
    console.log(err.response.data); // => status: true
  }
}

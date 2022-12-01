import axios from "axios";

export const getMovies = async (currentPage, numberOfMoviesPerPage) => {
  const domain = `https://josie-moviehut.herokuapp.com/api/movies`;
  const currentPageParam = `page=${currentPage}`;
  const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;

  const url = domain + '?' + currentPageParam + '&' + moviePageLimitParam;
  const json = await axios.get(url);

  return json.data;
}
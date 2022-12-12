import { useEffect, useState } from "react";
import { getRecommendedMovieList } from "../services/api";

export default function useMoviesPage () {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const numberOfMoviesPerPage = 5;

  useEffect(() => {
    (async () => {
      try {
        const response = await getRecommendedMovieList(currentPage, numberOfMoviesPerPage);

        const { pagination, data } = response;

        setMovies(previousMovies => [...previousMovies, ...data]);
        setTotalPageCount(pagination.totalPages);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          // Client was given a http error response (5xx, 4xx)
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but there was no response
          console.log(err.request);
        } else {
          // Anything else
          console.log('Error', err.message);
        }
      }
    })();
  }, [currentPage])

  return {
    movies,
    isLoading,
    totalPageCount,
    currentPage,
    setCurrentPage,
    numberOfMoviesPerPage
  };
}
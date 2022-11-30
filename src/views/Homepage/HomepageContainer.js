import React, { useEffect, useState } from "react";
import axios from "axios";

import Homepage from "./Homepage";

const HomepageContainer = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const numberOfMoviesPerPage = 5;

  // TO DO: move getMovies to a different file (create services/ api.js)
  const getMovies = async () => {
    const currentPageParam = `page=${currentPage}`;
    const moviePageLimitParam = `limit=${numberOfMoviesPerPage}`;
    const url = `https://josie-moviehut.herokuapp.com/api/movies?${currentPageParam}&${moviePageLimitParam}`;

    return await axios.get(url);
  }

  useEffect(() => {
      try {
        const response = getMovies();
        const { pagination, data } = response.data;

        setMovies([...movies, ...data]);
        setTotalPageCount(pagination.totalPages); // 150
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }, [currentPage]
  );

  const loadMoreMovies = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <Homepage movies={movies}
              totalPageCount={totalPageCount}
              isLoading={isLoading}
              currentPage={currentPage}
              loadMoreMovies={loadMoreMovies}
              numberOfMoviesPerPage={numberOfMoviesPerPage}
    />
  )
}

export default HomepageContainer;
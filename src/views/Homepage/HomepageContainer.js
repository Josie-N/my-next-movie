import React, { useEffect, useState } from "react";

import Homepage from "./Homepage";
import { getMovies } from "../../services/api";

const HomepageContainer = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const numberOfMoviesPerPage = 5;

  useEffect(() => {
      (async () => {
        try {
          const response = await getMovies(currentPage, numberOfMoviesPerPage);

          const { pagination, data } = response;

          setMovies([...movies, ...data]);
          setTotalPageCount(pagination.totalPages); // 150
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      })();
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
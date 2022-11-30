import React, { useEffect, useState } from "react";
import Homepage from "./Homepage";

const HomepageContainer = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const numberOfMoviesPerPage = 5;

  useEffect(() => {
      // async call instead of fetch
      // fetch() is hard to debug / do error handling
      fetch(`https://josie-moviehut.herokuapp.com/api/movies?page=${currentPage}&limit=${numberOfMoviesPerPage}`)
        .then(response => response.json())
        .then(json => {
          const { pagination, data } = json;

          setMovies([...movies, ...data]);
          setTotalPageCount(pagination.totalPages); // 150
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
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
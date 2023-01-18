import React from 'react';
import { useStore } from "../../../store/store";
import getMovieListConfiguration from "../utils/movieListConfiguration";
import useQueryList from "../../../hooks/useQueryList";
import EmptyScreen from "../../../components/generic/EmptyScreen/EmptyScreen";

function MovieListSwitch () {
  const movieListType = useStore(state => state.movieListType);

  const movieListConfig = getMovieListConfiguration(movieListType);
  const { movies, isLoading: isLoadingMovies } = useQueryList(movieListConfig);

  const empty = !isLoadingMovies && movies.data.length === 0;

  if (empty) {
    return <EmptyScreen />
  } else {
    // <MyComponent /> compiles to React.createElement(MyComponent, {}), which expects a string (HTML tag)
    // or a function (ReactClass) as first parameter.
    return React.createElement(movieListConfig.listComponent, {});
  }
}

export default MovieListSwitch;

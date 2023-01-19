import React from "react";
import {useStore} from "../../../store/store";

import useQueryList from "../../../hooks/useQueryList";
import getMovieListConfiguration from "../utils/movieListConfiguration";

import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";

const MovieListUserAdded = () => {
    const movieListType = useStore(state => state.movieListType);

    const movieListConfig = getMovieListConfiguration(movieListType);
    const {movies: addedMovies, fetchNextPage, hasNextPage} = useQueryList(movieListConfig);

    const handleLoadMoreMovies = () => {
        fetchNextPage();
    }

    return (
        <>
            <MovieList movies={addedMovies} />
            <LoadMoreMovies
                movies={addedMovies}
                handleLoadMoreMovies={handleLoadMoreMovies}
                hasNextPage={hasNextPage}
            />
        </>
    )
}

export default MovieListUserAdded;

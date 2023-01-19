import React from "react";
import {useStore} from "../../../store/store";

import useQueryList from "../../../hooks/useQueryList";
import getMovieListConfiguration from "../utils/movieListConfiguration";
import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";

const MovieListRejected = () => {
    const movieListType = useStore(state => state.movieListType);

    const movieListConfig = getMovieListConfiguration(movieListType);
    const {movies: rejectedMovies, fetchNextPage, hasNextPage} = useQueryList(movieListConfig);

    const handleLoadMoreMovies = () => {
        fetchNextPage();
    }

    return (
        <>
            <MovieList movies={rejectedMovies} />
            <LoadMoreMovies
                movies={rejectedMovies}
                handleLoadMoreMovies={handleLoadMoreMovies}
                hasNextPage={hasNextPage}
            />
        </>
    )
}

export default MovieListRejected;

import React from "react";
import {useStore} from "../../../store/store";

import useQueryList from "../../../hooks/useQueryList";
import useUpdateList from "./hooks/useUpdateList";

import {postToAddedMovieList, postToRejectedMovieList} from "../../../services/movieList";
import getMovieListConfiguration from '../utils/movieListConfiguration';
import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";

const MovieListRecommended = () => {
    const movieListType = useStore(state => state.movieListType);

    const movieListConfig = getMovieListConfiguration(movieListType);
    const {movies: recommendedMovies, fetchNextPage, hasNextPage} = useQueryList(movieListConfig);

    const addedList = useUpdateList(postToAddedMovieList);
    const removedList = useUpdateList(postToRejectedMovieList);

    // Runs when user adds a movie to added watchlist
    const handleMoveToAddedList = (_id: string, event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event.stopPropagation();

        // Send (not delete) movie from recommended list to added list
        // The function (with variables) to manually to trigger the mutation
        // @ts-ignore
        addedList.mutate(_id);
    };

    // Runs when user adds a movie to removed watchlist
    const handleMoveToRemovedList = (_id: string, event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event.stopPropagation();

        // Send (not delete) movie from recommended list to removed list
        // @ts-ignore
        removedList.mutate(_id);
    }

    const handleLoadMoreMovies = () => {
        fetchNextPage();
    }

    return (
        <>
            <MovieList
                movies={recommendedMovies}
                handleMoveToAddedList={handleMoveToAddedList}
                handleMoveToRemovedList={handleMoveToRemovedList}
            />
            <LoadMoreMovies
                movies={recommendedMovies}
                handleLoadMoreMovies={handleLoadMoreMovies}
                hasNextPage={hasNextPage}
            />
        </>
    )
}

export default MovieListRecommended;

import React from "react";
import {useStore} from "../../../store/store";
import useUpdateList from "./hooks/useUpdateList";
import useQueryListRecommended from "./hooks/useQueryListRecommended";
import MovieList from "../MovieList/MovieList";
import LoadMoreMovies from "../LoadMoreMovies/LoadMoreMovies";
import {postToAddedMovieList, postToRejectedMovieList} from "../../../services/movieList";

const MovieListRecommended = () => {
    const {movies: recommendedMovies, fetchNextPage, hasNextPage} = useQueryListRecommended();

    const setMovieCountAddedList = useStore(state => state.setMovieCountAddedList);
    const setMovieCountRemovedList = useStore(state => state.setMovieCountRemovedList);
    const addedList = useUpdateList(postToAddedMovieList);
    const removedList = useUpdateList(postToRejectedMovieList);

    // Runs when user adds a movie to added watchlist
    const handleMoveToAddedList = (_id: string, event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        setMovieCountAddedList();

        // Send (not delete) movie from recommended list to added list
        // The function (with variables) to manually to trigger the mutation
        // @ts-ignore
        addedList.mutate(_id);
    };

    // Runs when user adds a movie to removed watchlist
    const handleMoveToRemovedList = (_id: string, event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        setMovieCountRemovedList();

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

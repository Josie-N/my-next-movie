import create from "zustand";
import {MovieListType} from "../constants/constants";

interface StoreState {
    movieListType: string,
    changeMovieListType: (newMovieListType: string) => void,

    movieCountAddedList: number,
    setMovieCountAddedList: (state: number) => void,

    movieCountRemovedList: number,
    setMovieCountRemovedList: (state: number) => void,

    username: string,
    setUsername: (newUsername: string) => void,

    totalPageCount: number,
    setTotalPageCount: (newPageCount: number) => void,

    currentPage: number,
    setCurrentPage: (state: number) => void,
}

export const useStore = create<StoreState>(
    (set) => ({
        movieListType: MovieListType.Recommended,
        changeMovieListType: (newMovieListType) => set({movieListType: newMovieListType}),

        movieCountAddedList: 0,
        setMovieCountAddedList: () => set((state) => ({movieCountAddedList: state.movieCountAddedList + 1})),

        movieCountRemovedList: 0,
        setMovieCountRemovedList: () => set((state) => ({movieCountRemovedList: state.movieCountRemovedList + 1})),

        username: '',
        setUsername: (newUsername) => set(({username: newUsername})),

        totalPageCount: 0,
        setTotalPageCount: (newPageCount) => set({totalPageCount: newPageCount}),

        currentPage: 1,
        setCurrentPage: () => set((state) => ({currentPage: state.currentPage + 1})),
    })
);

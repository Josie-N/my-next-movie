import create from "zustand";
import {MovieListType} from "../constants/constants";
import {getFormatToLowercase, getGenerateUsername} from "../pages/MoviesPage/utils/helper";

const username = getFormatToLowercase(getGenerateUsername());

interface StoreState {
    movieListType: string,
    changeMovieListType: (newMovieListType: string) => void,

    movieCountAddedList: number,
    setMovieCountAddedList: (state: number) => void,

    movieCountRemovedList: number,
    setMovieCountRemovedList: (state: number) => void,

    username: string,

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

        username: username,

        totalPageCount: 0,
        setTotalPageCount: (newPageCount) => set({totalPageCount: newPageCount}),

        currentPage: 1,
        setCurrentPage: () => set((state) => ({currentPage: state.currentPage + 1})),
    })
);

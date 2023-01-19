import create from "zustand";
import {persist} from 'zustand/middleware'
import {MovieListType} from "../constants/constants";
import {getFormatToLowercase, getGenerateUsername} from "../pages/MoviesPage/utils/helper";

const username = getFormatToLowercase(getGenerateUsername());

interface StoreState {
    movieListType: string,
    changeMovieListType: (newMovieListType: string) => void,
}

export const useStore = create<StoreState>(
    (set) => ({
        movieListType: MovieListType.Recommended,
        changeMovieListType: (newMovieListType) => set(
            {movieListType: newMovieListType}
        )
    })
);

export const useUsernameStore = create(
    persist(
        () => ({
            username: username,
        }),
        {
            name: 'username-storage', // name of the item in the storage (must be unique)
            getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
        }
    )
);
